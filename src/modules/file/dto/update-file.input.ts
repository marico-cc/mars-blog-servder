import { CreateFileInput } from './create-file.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateFileInput extends PartialType(CreateFileInput) {
  @Field(() => ID)
  id: string;
}
