import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { UserService } from '../user/user.service';
import { ConfigService } from '../shared/config/config.service';
import { LoginUserInput, TokenPayload } from '../user/dto/users-inputs.dto';
import { compare } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { CmsError } from '../../utils/GqlError';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly _usersService: UserService,
    private readonly _jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUserByPassword(
    loginUserInput: LoginUserInput,
  ): Promise<TokenPayload> {
    const userName = loginUserInput.userName;
    const password = loginUserInput.password;
    const user = await this._usersService.findByUserName(userName);
    if (!user) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new CmsError('Invalid email or password.', HttpStatus.BAD_REQUEST);
    }
    if (isMatch) {
      const {
        token,
        freshToken,
        data: { expiration },
      } = this.createJwt(user, true);

      return {
        user: user!,
        token,
        freshToken,
        expireAt: expiration,
      } as TokenPayload;
    }
  }

  async validateJwtPayload(payload: JwtPayload): Promise<User> {
    return await this._usersService.findOne(payload.userId);
  }

  createJwt(
    user: User,
    needsRefresh = false,
  ): { data: JwtPayload; token: string; freshToken?: string } {
    const expiresIn = this.configService.jwtExpiresIn;
    const expiration: Date = new Date();
    if (expiresIn) {
      expiration.setTime(expiration.getTime() + expiresIn * 1000);
    }

    const data: JwtPayload = {
      userName: user.userName,
      userId: user.id,
      expiration,
    };

    const jwt = this._jwtService.sign(data);

    const result = {
      data,
      token: jwt,
      freshToken: undefined,
    };

    if (needsRefresh) {
      const freshTokenExpiration: Date = new Date();
      freshTokenExpiration.setTime(
        freshTokenExpiration.getTime() +
          this.configService.refreshTokenExpiresIn * 1000,
      );
      result.freshToken = this._jwtService.sign({
        ...data,
        expiration: freshTokenExpiration,
      });
    }

    return result;
  }

  getTokenByFreshToken(
    authorization: string,
    freshToken: string,
  ): TokenPayload {
    try {
      const user = this._jwtService.decode(
        authorization?.replace(/bearer /i, '') ?? '',
      );
      const _user = this._jwtService.decode(freshToken);
      if (!_user) {
        throw new CmsError('Invalid token.', HttpStatus.UNAUTHORIZED);
      }
      if (_user.userId !== user.userId || _user.userName !== user.userName) {
        throw new CmsError('Invalid token.', HttpStatus.UNAUTHORIZED);
      }

      const tokenUser = {
        userName: user.userName,
        id: user.userId,
      } as User;

      const {
        token,
        data: { expiration },
      } = this.createJwt(tokenUser);

      return {
        user: user!,
        token,
        expireAt: expiration,
      } as TokenPayload;
    } catch (e) {
      console.log(`getTokenByFreshToken`, e);
      throw new CmsError('Invalid token.', HttpStatus.UNAUTHORIZED);
    }
  }
}
