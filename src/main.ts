import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  const prismaService = app.get(PrismaService);
  try {
    await prismaService.$connect();
    console.log('Prisma connected to the database successfully.');
  } catch (error) {
    console.error('Failed to connect to the database with Prisma:', error);
  }
  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
