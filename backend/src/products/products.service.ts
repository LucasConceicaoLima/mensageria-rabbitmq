import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsMapper } from './mappers/products.mapper';
import { ProductsRepository } from './repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(dto: CreateProductDto) {
    const product = await this.productsRepository.create(dto);

    return ProductsMapper.toResponse(product);
  }

  async findAll() {
    const products = await this.productsRepository.findAll();

    return products.map((product) => ProductsMapper.toResponse(product));
  }

  async findById(id: string) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return ProductsMapper.toResponse(product);
  }

  async update(id: string, dto: UpdateProductDto) {
    const existingProduct = await this.productsRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundException('Product not found.');
    }

    const updatedProduct = await this.productsRepository.update(id, dto);

    return ProductsMapper.toResponse(updatedProduct);
  }

  async delete(id: string) {
    const existingProduct = await this.productsRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundException('Product not found.');
    }

    await this.productsRepository.delete(id);
  }
}
