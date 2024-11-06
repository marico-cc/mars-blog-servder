import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserController } from './user.controller';
import { UserProviders } from './user.provider';

@Module({
  controllers: [UserController],
  providers: [UserResolver, UserService, UserProviders],
  exports: [UserService, UserProviders],
})
export class UserModule {}
