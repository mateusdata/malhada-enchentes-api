
import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(){
    super({
     omit:{
      user:{
        deviceToken: false,  
      }
     }
    })
  }
  async onModuleInit() {
    await this.$connect();
  }
}
