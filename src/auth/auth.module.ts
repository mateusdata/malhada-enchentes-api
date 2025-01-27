import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Module({
  imports:[
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
      
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
