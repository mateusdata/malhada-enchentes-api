import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger('API-OrcaData'),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades extras não definidas no DTO
      forbidNonWhitelisted: true, // Retorna erro se propriedades extras forem enviadas
      transform: true, // Converte automaticamente os tipos dos dados
    }),
  );

  const logger = new Logger('Bootstrap');

  const config = new DocumentBuilder()
  .setTitle('Malhada Floods API')
  .setDescription('API documentation for Malhada Floods')
  .setVersion('1.0')
  .addTag('Endpoints')
 
  .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Configuração correta do Swagger

  const port = process.env.PORT ?? 3001;
  await app.listen(port, "0.0.0.0");

  const prismaService = app.get(PrismaService);
  try {
    await prismaService.$connect();
    logger.warn('Prisma connected to the database successfully.');
  } catch (error) {
    logger.error('Failed to connect to the database with Prisma:', error);
  }

  logger.debug(`Server is running on http://localhost:${port}`);
}
bootstrap();
