import { InputType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '../../tag/entities/tag.entity';
import { GraphQLJSON } from 'graphql-scalars';

@InputType()
export class CreateArticleInput {
  @Field(() => ID)
  @ApiProperty()
  siteId: string;

  @Field(() => ID)
  @ApiProperty()
  nodeId: string;

  @Field(() => ID, { nullable: true })
  @ApiProperty()
  userId: string;

  @Field(() => String)
  @ApiProperty()
  title: string;

  @Field(() => String)
  @ApiProperty()
  isPrivate: string;

  @Field(() => String)
  @ApiProperty()
  content: string;

  @Field(() => String, { nullable: true })
  @ApiProperty()
  thumbUrl?: string;

  @Field(() => [String], { nullable: true })
  @ApiProperty()
  images?: Array<string>;

  @Field(() => String, { nullable: true })
  @ApiProperty()
  author?: string;

  @Field(() => String, { nullable: true })
  @ApiProperty()
  origin?: string;

  @Field(() => String, { nullable: true })
  @ApiProperty()
  originUrl?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @ApiProperty()
  tags?: Array<Tag>;
}
