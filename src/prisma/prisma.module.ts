import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Torna o módulo Prisma global
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta o PrismaService para uso em outros módulos
})
export class PrismaModule {}
