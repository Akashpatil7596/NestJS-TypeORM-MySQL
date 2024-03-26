import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Optional,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function userAgent(req: Request, res: Response, next: NextFunction) {
  const ua = req.headers['user-agent'];

  console.log('ua', ua);

  req['ua'] = ua;

  next();
}

export class UserAgentOptions {
  accepted?: string[];
}

@Injectable()
export class UserAgentMiddlewar implements NestMiddleware {
  constructor(@Optional() private options: UserAgentOptions) {}

  use(req: Request, res: Response, next: (error?: NextFunction) => void) {
    const userAgent = req.headers['user-agent'];
    console.log('userAgent', userAgent);

    const acceptedUserAgents: any = this.options || [];

    const result = acceptedUserAgents?.some((agent: string) =>
      userAgent?.startsWith(agent),
    );

    if (!result) {
      throw new ForbiddenException('not allowed');
    }

    req['ua'] = userAgent;

    next();
  }
}
