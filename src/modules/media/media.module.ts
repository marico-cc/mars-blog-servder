import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { Media } from './entities/media.entity';

@Module({
  providers: [
    MediaResolver,
    MediaService,
    { provide: 'MediaRepository', useValue: Media },
  ],
})
export class MediaModule {}
