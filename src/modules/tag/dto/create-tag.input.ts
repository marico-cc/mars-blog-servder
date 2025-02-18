import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field(() => String, { description: 'Tag name' })
  name: string;
}
