import { Resolver, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { TokenPayload, LoginUserInput } from '../user/dto/users-inputs.dto';
import { AuthenticationError } from '@nestjs/apollo';

type Login = {
  user: User;
  token: string;
};

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => TokenPayload, { name: 'login' })
  async login(@Args('loginInput') loginInput: LoginUserInput): Promise<Login> {
    const result = await this.authService.validateUserByPassword(loginInput);
    if (result) return result;
    throw new BadRequestException(
      'Could not log-in with the provided credentials',
    );
  }

  // There is no username guard here because if the person has the token, they can be any user
  @Query(() => TokenPayload, { name: 'refreshToken' })
  async refreshToken(
    @Context('req') request: any,
    @Args('token') token: string,
  ): Promise<TokenPayload> {
    if (!request.headers?.authorization)
      throw new AuthenticationError(
        'Could not log-in with the provided credentials',
      );
    return this.authService.getTokenByFreshToken(
      request.headers?.authorization,
      token,
    );
  }
}
