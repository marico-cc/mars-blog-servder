import { InputType, ID, Field } from '@nestjs/graphql';

@InputType()
export class CreateSiteInput {
  @Field(() => String, { description: 'site name' })
  siteName: string;

  @Field(() => String, { nullable: true })
  siteDomain: string;

  @Field(() => [ID], { nullable: true })
  superAdmin: Array<string>;

  @Field(() => [ID], { nullable: true })
  admin: Array<string>;

  @Field(() => [ID], { nullable: true })
  user: Array<string>;
}
