import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { Article } from './entities/article.entity';
import { TagModule } from '../tag/tag.module';
import { TagArticleRelationshipModule } from '../tag-article-relitioanship/tag-article-relationship.module';

@Module({
  imports: [TagModule, TagArticleRelationshipModule],
  providers: [
    ArticleResolver,
    ArticleService,
    { provide: 'ArticleRepository', useValue: Article },
  ],
})
export class ArticleModule {}
