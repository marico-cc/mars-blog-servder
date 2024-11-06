import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Model } from 'sequelize-typescript'

@ObjectType()
export class Entrance extends Model {
  @Field(() => Int, { description: 'Example field (placeholder)' })
    exampleField: number
}
