import { CreateEntranceInput } from './create-entrance.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateEntranceInput extends PartialType(CreateEntranceInput) {
  @Field(() => Int)
    id: number
}
