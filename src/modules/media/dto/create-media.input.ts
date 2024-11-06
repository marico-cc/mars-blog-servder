import { InputType, ID, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateMediaInput {
  @Field(() => ID)
  siteId: string;

  @Field(() => ID)
  nodeId: string;

  @Field(() => String)
  title: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @ApiProperty()
  mediaList: object;

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  thumbUrl: string;
}
