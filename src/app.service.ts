import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    const data = {
      api: 'Malhada Weather API', 
    }
    return data;
  }
}
