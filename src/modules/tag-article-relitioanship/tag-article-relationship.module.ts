import { Module } from '@nestjs/common';
import { TagArticleRelationshipService } from './tag-article-relationship.service';
import { TagArticleRelationshipResolver } from './tag-article-relationship.resolver';
import { TagArticleRelationship } from './entities/tag-article-relationship.entity';

@Module({
  providers: [
    TagArticleRelationshipResolver,
    TagArticleRelationshipService,
    {
      provide: 'TagArticleRepository',
      useValue: TagArticleRelationship,
    },
  ],
  exports: [TagArticleRelationshipService],
})
export class TagArticleRelationshipModule {}
