import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth-dto';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name, {timestamp:true}); // Cria um logger para este serviço

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }
  

  async signIn(createAuthDto: CreateAuthDto) {

    const user = await this.prisma.user.findUnique({
      where: {
        email: createAuthDto.email,
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(createAuthDto.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password, ...result } = user;

    const payload = await this.jwtService.signAsync({ id: user.id, username: user.name });

    this.logger.log(`Login attempt for email: ${createAuthDto.email}`,); // Log da tentativa de login

    return {...result, token: payload};
  }
}
