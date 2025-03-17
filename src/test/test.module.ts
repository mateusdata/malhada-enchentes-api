import { ScheduleModule } from '@nestjs/schedule';
import { Module } from '@nestjs/common';
import { TestService } from './test.service';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],

  providers: [TestService]
})
export class TestModule { }
