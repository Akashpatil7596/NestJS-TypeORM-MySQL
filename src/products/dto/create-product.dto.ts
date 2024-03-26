import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'iphone x',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 20000,
    required: true,
  })
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    example: 'This is the new apple mobile',
    required: true,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  userId: number;
}
