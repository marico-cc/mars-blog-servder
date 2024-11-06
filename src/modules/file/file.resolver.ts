import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { CreateFileInput } from './dto/create-file.input';
import { OssUploadSignature } from './dto/oss-upload-signature.output';

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => File)
  createFile(@Args('createFileInput') createFileInput: CreateFileInput) {
    return this.fileService.create(createFileInput);
  }

  @Query(() => [File], { name: 'files' })
  findAll() {
    return this.fileService.findAll();
  }

  @Query(() => File, { name: 'file' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.fileService.findOne(id);
  }

  @Mutation(() => File)
  removeFile(@Args('fileName', { type: () => String }) fileName: string) {
    return this.fileService.remove(fileName);
  }

  @Query(() => OssUploadSignature, { name: 'ossInit' })
  getOssSignature() {
    return this.fileService.ossUploadSignup();
  }
}
