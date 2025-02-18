import { CreateTagInput } from './create-tag.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @Field(() => String)
  id: string;
  name: string;
}
