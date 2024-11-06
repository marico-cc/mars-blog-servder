import { Test, TestingModule } from '@nestjs/testing';
import { TagArticleRelitioanshipResolver } from './tag-article-relationship.resolver';
import { TagArticleRelationshipService } from './tag-article-relationship.service';

describe('TagArticleRelitioanshipResolver', () => {
  let resolver: TagArticleRelitioanshipResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagArticleRelitioanshipResolver,
        TagArticleRelationshipService,
      ],
    }).compile();

    resolver = module.get<TagArticleRelitioanshipResolver>(
      TagArticleRelitioanshipResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
