import { InputType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateFileInput {
  @Field(() => String)
  @ApiProperty()
  fileName: string;

  @Field(() => String, { nullable: true })
  @ApiProperty()
  fileMime: string;

  @Field(() => String, { nullable: true })
  @ApiProperty()
  fileType: string;

  @Field(() => String)
  @ApiProperty()
  filePath: string;

  @Field(() => Number, { nullable: true })
  @ApiProperty()
  fileSize?: number;

  @Field(() => ID)
  @ApiProperty()
  siteId: string;

  @Field(() => ID)
  @ApiProperty()
  createdBy: string;
}
