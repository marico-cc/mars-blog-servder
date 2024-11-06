import { CreateNodeInput } from './create-node.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateNodeInput extends PartialType(CreateNodeInput) {
  @Field(() => ID)
  id: string;
}
