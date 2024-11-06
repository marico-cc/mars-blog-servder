import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTagArticleRelationshipInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
