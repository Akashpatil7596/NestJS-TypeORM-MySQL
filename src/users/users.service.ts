import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async insert(createUserDTO) {
    const newUser = this.userRepository.create(createUserDTO);

    return this.userRepository.save(newUser);
  }

  async findOne(query) {
    return await this.userRepository.findOne({
      where: query,
      relations: {
        product: true,
      },
    });
  }

  async find(query) {
    return this.userRepository.find(query);
  }
}
