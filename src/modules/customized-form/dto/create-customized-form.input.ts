import { InputType, Field, ID } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';

@InputType()
export class CreateCustomizedFormInput {
  @Field(() => ID, { description: 'siteId' })
  siteId: string;

  @Field(() => ID, { description: 'nodeId' })
  nodeId: string;

  @Field(() => GraphQLJSON, { nullable: true })
  values: object;
}
