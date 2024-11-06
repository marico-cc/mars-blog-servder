import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';
import { ConfigService } from '../shared/config/config.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          secret: configService.jwtSecret,
        };
        if (configService.jwtExpiresIn) {
          options.signOptions = {
            expiresIn: configService.jwtExpiresIn,
          };
        }
        return options;
      },
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
    UserModule,
    SharedModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
