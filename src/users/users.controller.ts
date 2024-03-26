import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from './auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async storeUsers(
    @Body()
    createUserDTO: CreateUserDTO,
  ) {
    try {
      return await this.usersService.insert(createUserDTO);
    } catch (error) {
      return error;
    }
  }

  // @UseGuards(AuthGuard)
  @Get('list')
  async getUserList() {
    try {
      return this.usersService.find({});
    } catch (error) {
      return error;
    }
  }

  // @UseGuards(AuthGuard)
  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    console.log(req['ua']);

    try {
      return this.usersService.findOne({ id: id });
    } catch (error) {
      return error;
    }
  }
}
