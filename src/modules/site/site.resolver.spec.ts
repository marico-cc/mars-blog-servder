import { Test, TestingModule } from '@nestjs/testing';
import { SiteResolver } from './site.resolver';
import { SiteService } from './site.service';

describe('SiteResolver', () => {
  let resolver: SiteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteResolver, SiteService],
    }).compile();

    resolver = module.get<SiteResolver>(SiteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
