import { Injectable, ExecutionContext, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from '@nestjs/apollo';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import * as punycode from 'punycode';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw new AuthenticationError('Unauthorized');
    }
    return user;
  }

  // canActivate(context: ExecutionContext): boolean | Promise<boolean> {
  //   // console.log(this.getRequest(context));
  //   this.getRequest(context);
  //   return false;
  // }
}
