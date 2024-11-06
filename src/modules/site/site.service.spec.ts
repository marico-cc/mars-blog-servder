import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { SiteService } from './site.service';
import { SiteResolver } from './site.resolver';
import { CreateSiteInput } from './dto/create-site.input';
import { SiteProvider } from './site.provider';

describe('SiteService', () => {
  let service: SiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, DatabaseModule],
      controllers: [],
      providers: [SiteService, SiteResolver, SiteProvider],
    }).compile();

    service = module.get<SiteService>(SiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a site', async () => {
    const data: CreateSiteInput = {
      siteName: 'Test',
      siteDomain: 'site.marico.cc',
      superAdmin: ['c070a5f9-4f25-4b63-b3c2-f7e6717cf163'],
      admin: ['c070a5f9-4f25-4b63-b3c2-f7e6717cf163'],
      user: ['c070a5f9-4f25-4b63-b3c2-f7e6717cf163'],
    };
    const res = await service.create(data);
    expect(res.id).toBeDefined();
  });
});
