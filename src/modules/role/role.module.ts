import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { RoleProvider } from './role.provider';

@Module({
  imports: [],
  providers: [RoleResolver, RoleService, RoleProvider],
  exports: [RoleService],
})
export class RoleModule {}
