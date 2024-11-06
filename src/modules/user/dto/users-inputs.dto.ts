import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class LoginUserInput {
  @Field(() => String)
  userName: string;
  @Field(() => String)
  password: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  oldPassword: string;
  @Field(() => String)
  newPassword: string;
}

@ObjectType()
export class TokenPayload {
  @Field(() => User)
  user: User;
  @Field(() => String)
  token: string;

  @Field(() => String)
  freshToken?: string;

  @Field(() => Date)
  expireAt: Date;
}

@ObjectType()
export class SignOutResult {
  @Field(() => User)
  user: User;
  @Field(() => null)
  token: null;
}
