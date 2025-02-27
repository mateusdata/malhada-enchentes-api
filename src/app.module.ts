import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { NotificationsModule } from './notifications/notifications.module';
import { WeatherModule } from './weather/weather.module';


@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    NotificationsModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
  exports: [],

})
export class AppModule { }
