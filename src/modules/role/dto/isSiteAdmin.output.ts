import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IsSiteAdmin {
  @Field(() => Boolean)
  isSiteAdmin: boolean;

  @Field(() => Boolean)
  isSiteSuperAdmin: boolean;
}
