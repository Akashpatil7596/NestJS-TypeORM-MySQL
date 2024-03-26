import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    example: 'username',
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '*****',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(8)
  password: string;

  @ApiProperty({
    example: '27',
    required: true,
  })
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    example: 15000,
    required: true,
  })
  @IsNotEmpty()
  salary: number;
}
