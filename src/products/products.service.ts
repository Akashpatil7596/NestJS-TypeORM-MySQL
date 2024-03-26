import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    console.log('createProductDto', createProductDto);

    const newProduct = this.productRepository.create(createProductDto);

    return this.productRepository.save(newProduct);
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(query: { id: number }) {
    return this.productRepository.findOne({
      where: query,
      relations: {
        user: true,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
