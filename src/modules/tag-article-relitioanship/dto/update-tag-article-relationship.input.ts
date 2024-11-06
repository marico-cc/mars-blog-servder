import { CreateTagArticleRelationshipInput } from './create-tag-article-relationship.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTagArticleRelationshipInput extends PartialType(
  CreateTagArticleRelationshipInput,
) {
  @Field(() => Int)
  id: number;
}
