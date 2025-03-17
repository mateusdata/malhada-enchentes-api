import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationsModule } from './notifications/notifications.module';
import { WeatherModule } from './weather/weather.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { EducationalsModule } from './educationals/educationals.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { WaterLevelModule } from './water-level/water-level.module';
import { WebsocketsModule } from './websockets/websockets.module';
import { TestModule } from './test/test.module';


@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 60,
        },
      ],
    }),
    UsersModule,
    PrismaModule,
    NotificationsModule,
    WeatherModule,
    EducationalsModule,
    WaterLevelModule,
    WebsocketsModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
  ],
  exports: [],
})
export class AppModule {}
