import { CreateSiteInput } from './create-site.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSiteInput extends PartialType(CreateSiteInput) {
  @Field(() => ID)
  id: string;
}
