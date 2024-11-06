import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { Tag } from './entities/tag.entity';

@Module({
  providers: [
    TagResolver,
    TagService,
    { provide: 'TagRepository', useValue: Tag },
  ],
  exports: [TagService],
})
export class TagModule {}
