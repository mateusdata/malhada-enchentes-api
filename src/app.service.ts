import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    const data = {
      api: 'v1',
    }
    return data;
  }
}
