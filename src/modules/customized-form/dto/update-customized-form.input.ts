import { CreateCustomizedFormInput } from './create-customized-form.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateCustomizedFormInput extends PartialType(
  CreateCustomizedFormInput,
) {
  @Field(() => ID)
  id: string;
}
