import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => ID)
  siteId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => String)
  roleCode: string;

  @Field(() => String, { nullable: true })
  createdBy: string;
}
