import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './constants';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Public()
  @ApiExcludeEndpoint()
  @Get()
  getHello(): object {
    return this.appService.getHello();
  }
}
