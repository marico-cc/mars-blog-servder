import { Module } from '@nestjs/common';
import { CustomizedFormService } from './customized-form.service';
import { CustomizedFormResolver } from './customized-form.resolver';
import { CustomizedForm } from './entities/customized-form.entity';

@Module({
  providers: [
    CustomizedFormResolver,
    CustomizedFormService,
    {
      provide: 'CustomizedFormRepository',
      useValue: CustomizedForm,
    },
  ],
})
export class CustomizedFormModule {}
