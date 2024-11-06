import { InputType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class SavePageInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => ID)
  @ApiProperty()
  siteId: string;

  @Field(() => ID)
  @ApiProperty()
  nodeId: string;

  @Field(() => String)
  @ApiProperty()
  title: string;

  @Field(() => String)
  @ApiProperty()
  content: string;

  @Field(() => String, { nullable: true })
  @ApiProperty()
  thumbUrl?: string;

  @Field(() => [String], { nullable: true })
  @ApiProperty()
  images?: Array<string>;
}
