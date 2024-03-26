import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import {
  UserAgentMiddlewar,
  UserAgentOptions,
  userAgent,
} from './middleware/user-agent.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthGuard,
    AuthService,
    {
      provide: UserAgentOptions,
      useValue: ['chrome', 'Mozilla/5.0'],
    },
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, UserAgentMiddlewar)
      .exclude({ path: 'users/create', method: RequestMethod.POST })
      .forRoutes({ path: 'users/list', method: RequestMethod.GET });
  }
}
