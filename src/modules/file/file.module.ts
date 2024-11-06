import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { File } from './entities/file.entity';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: './upload',
      fileFilter: (req, file, cb) => {
        file.filename = `${file.filename}.${
          file.originalname.split('.').reverse()[0]
        }`;
        cb(null, true);
      },
    }),
  ],
  providers: [
    FileResolver,
    FileService,
    { provide: 'FileRepository', useValue: File },
  ],
  controllers: [FileController],
})
export class FileModule {}
