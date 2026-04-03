import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenStrategy } from './strategies/refreshToken.startegy';
import { JwtStrategy } from './strategies/jwt.startegy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}), 
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
