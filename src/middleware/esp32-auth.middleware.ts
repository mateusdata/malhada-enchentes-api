import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Esp32Auth implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Eii, eu sou um middleware e estou sendo usado apenas nessa classe aqui');
    
    const esp32Key = req.headers['esp32key'];
   
    
    if(process.env.ESP32KEY !== esp32Key) {
      return res.status(401).json({ message: 'Invalid ESP32 key' });
    }   

    console.log('Cheves de autenticação corretas');
    next(); 
  }
}