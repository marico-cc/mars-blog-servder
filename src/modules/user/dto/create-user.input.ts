import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';
import { GenderEnum } from '../../../constants/enum/gender.enum';
import { ApiProperty } from '@nestjs/swagger';
@InputType()
export class CreateUserInput {
  @Field()
  @ApiProperty()
  @IsString()
  readonly userName: string;

  @Field({ nullable: true })
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @Field()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @Field()
  @ApiProperty()
  @IsString()
  readonly nickName: string;

  @Field({ nullable: true })
  @ApiProperty()
  @IsString()
  readonly phone?: string;

  @Field({ nullable: true })
  @ApiProperty()
  @IsOptional()
  @IsEnum(GenderEnum)
  readonly gender?: GenderEnum;
}
