import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: NextFunction) => void) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('req.headers', token);

    next();
  }
}
