import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
  Headers,
  UseGuards,
  Req,
  All,
  Body,
  Redirect,
  Header,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid4 } from 'uuid';
import { fromMime as getFileTypeFromMime } from 'human-filetypes';
import { CreateFileInput } from './dto/create-file.input';
import { FileService } from './file.service';
import { CurrentUser } from '../../utils/user.decorator';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('file')
export class FileController {
  constructor(
    private readonly service: FileService,
    private readonly fileService: FileService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 1, {
      fileFilter: (req, file, cb) => {
        const whiteTypeList = [
          'image',
          'video',
          'audio',
          'document',
          'spreadsheet',
          'presentation',
          'text',
        ];

        cb(null, whiteTypeList.includes(getFileTypeFromMime(file.mimetype)));
      },
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
          const fileExtName = file.originalname.split('.').reverse()[0];
          callback(null, `${uuid4()}.${fileExtName}`);
        },
      }),
    }),
  )
  @UseGuards(JwtAuthGuard)
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Headers() headers: any,
    @CurrentUser() user: User,
  ) {
    const fileInput = new CreateFileInput();
    fileInput.fileName = files[0].filename;
    fileInput.fileMime = files[0].mimetype;
    fileInput.fileType = getFileTypeFromMime(files[0].mimetype);
    fileInput.filePath = files[0].path;
    fileInput.fileSize = files[0].size;
    fileInput.siteId = headers?.['ssid'] || '';
    fileInput.createdBy = user.id;
    await this.service.create(fileInput);

    return { fileUrl: `file/${files[0].filename}` };
  }

  @Get(':fileName')
  async serveAvatar(@Param('fileName') fileName, @Res() res): Promise<any> {
    res.sendFile(fileName, { root: 'upload' });
    await this.service.updateQueryCount(fileName);
  }

  @Get('oss/get/*/:fileName')
  @Header('Cache-Control', '31104000')
  async getOssFile(
    @Param('fileName') fileName,
    @Req() req,
    @Res() res,
  ): Promise<any> {
    console.log(req.path);
    const filePath = req.path.replace('/file', 'file');
    await this.service.updateQueryCount(filePath);
    const host = ((await this.fileService.ossUploadSignup()) as any).host || '';
    res.redirect(`${host}/${req.path.replace('/file/oss/get/', '')}`);
  }

  @Post('oss/callback')
  async callback(@Body() body): Promise<any> {
    const fileInput = new CreateFileInput();
    fileInput.fileName = body.filename.split('/').pop();
    fileInput.fileMime = body.mimeType;
    fileInput.fileType = getFileTypeFromMime(body.mimeType);
    fileInput.filePath = `file/oss/get/` + body.filename;
    fileInput.fileSize = body.size;
    fileInput.siteId = body.sid || '';
    fileInput.createdBy = body.uuid;
    await this.service.create(fileInput);
    return { fileUrl: `file/oss/get/${body.filename}` };
  }
}
