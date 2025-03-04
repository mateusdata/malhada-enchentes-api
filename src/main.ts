import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { ConsoleLogger, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'API-OrcaData', // Default is "Nest"
    }),
  });
  const logger = new Logger('Bootstrap');

  const config = new DocumentBuilder()
    .setTitle('Api Obra-data')
    .setDescription('Arocha nego veilho ')
    .setVersion('1.0')
    .addTag('Endpoints')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  
  SwaggerModule.setup('docs', app, documentFactory);

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
