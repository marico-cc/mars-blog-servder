import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLogInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
