import { Test, TestingModule } from '@nestjs/testing';
import { CustomizedFormResolver } from './customized-form.resolver';
import { CustomizedFormService } from './customized-form.service';

describe('CustomizedFormResolver', () => {
  let resolver: CustomizedFormResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomizedFormResolver, CustomizedFormService],
    }).compile();

    resolver = module.get<CustomizedFormResolver>(CustomizedFormResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
