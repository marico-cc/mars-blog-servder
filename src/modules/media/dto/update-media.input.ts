import { CreateMediaInput } from './create-media.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMediaInput extends PartialType(CreateMediaInput) {
  @Field(() => ID)
  id: string;
}
