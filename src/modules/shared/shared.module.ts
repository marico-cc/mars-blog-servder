import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { SharedResolver } from './Shared.resoler';

@Global()
@Module({
  providers: [ConfigService, SharedResolver],
  exports: [ConfigService, SharedResolver],
  imports: [],
  controllers: [],
})
export class SharedModule {}
