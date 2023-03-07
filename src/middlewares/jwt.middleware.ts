import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token, 'token');
    if (token) {
      try {
        const decoded = await jwt.verify(token, 'topSecret51');
        console.log(decoded);
        req['user'] = decoded;
      } catch (error) {
        console.log(error);
      }
    }
    next();
  }
}
