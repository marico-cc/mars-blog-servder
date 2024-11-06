import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Model } from 'sequelize-typescript';

@ObjectType()
export class Log extends Model {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
