import { Module } from '@nestjs/common';
import { EducationalsService } from './educationals.service';
import { EducationalsController } from './educationals.controller';

@Module({
  controllers: [EducationalsController],
  providers: [EducationalsService],
})
export class EducationalsModule {}
