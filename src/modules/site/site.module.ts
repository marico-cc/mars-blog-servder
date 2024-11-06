import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteResolver } from './site.resolver';
import { SiteProvider } from './site.provider';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [RoleModule],
  providers: [SiteResolver, SiteService, SiteProvider],
})
export class SiteModule {}
