import { Test, TestingModule } from '@nestjs/testing';
import { CustomizedFormService } from './customized-form.service';

describe('CustomizedFormService', () => {
  let service: CustomizedFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomizedFormService],
    }).compile();

    service = module.get<CustomizedFormService>(CustomizedFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
