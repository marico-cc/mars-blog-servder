import { Test, TestingModule } from '@nestjs/testing';
import { TagArticleRelationshipService } from './tag-article-relationship.service';

describe('TagArticleRelationshipService', () => {
  let service: TagArticleRelationshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagArticleRelationshipService],
    }).compile();

    service = module.get<TagArticleRelationshipService>(
      TagArticleRelationshipService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
