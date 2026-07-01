import { Product } from '@prisma/client';
import { ProductResponseDto } from '../dto/product-response.dto';

export class ProductsMapper {
  static toResponse(product: Product): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description ?? undefined,
      price: Number(product.price),
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}