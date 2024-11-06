import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class CurrentUserInfo extends User {
  @Field(() => Boolean)
  isSystemAdmin?: boolean;

  @Field(() => Boolean)
  isAdmin?: boolean;

  @Field(() => Boolean)
  isSuperAdmin?: boolean;
}
