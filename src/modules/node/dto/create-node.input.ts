import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateNodeInput {
  @Field(() => ID, { nullable: true })
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly parentId: string;

  @Field(() => String)
  @ApiProperty()
  @IsString()
  readonly nodeName: string;

  @Field(() => String, { nullable: true })
  @ApiProperty()
  @IsString()
  readonly uniKey: string;

  @Field(() => ID)
  @ApiProperty()
  @IsString()
  readonly siteId: string;

  @Field()
  @ApiProperty()
  @IsString()
  readonly type: string;

  @Field(() => Int, { nullable: true })
  @ApiProperty()
  @IsString()
  @IsOptional()
  uploadMax?: number;

  @Field(() => Int, { nullable: true })
  @ApiProperty()
  @IsString()
  @IsOptional()
  order?: number;
}
