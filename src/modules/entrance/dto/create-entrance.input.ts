import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateEntranceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
    exampleField: number
}
