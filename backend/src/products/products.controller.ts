import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductsService } from './products.service';

import { ResponseMessage } from '../common/decorators/response-message.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ResponseMessage('Product created successfully.')
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Creates a new product in the catalog.',
  })
  @ApiCreatedResponse({
    description: 'Product created successfully.',
    type: ProductResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body.',
  })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  @ResponseMessage('Products retrieved successfully.')
  @ApiOperation({
    summary: 'Get all products',
    description: 'Returns all registered products.',
  })
  @ApiOkResponse({
    description: 'List of products.',
    type: ProductResponseDto,
    isArray: true,
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Product retrieved successfully.')
  @ApiOperation({
    summary: 'Get a product by id',
    description: 'Returns a product by its identifier.',
  })
  @ApiOkResponse({
    description: 'Product found.',
    type: ProductResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Product not found.',
  })
  findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Put(':id')
  @ResponseMessage('Product updated successfully.')
  @ApiOperation({
    summary: 'Update a product',
    description: 'Updates an existing product.',
  })
  @ApiOkResponse({
    description: 'Product updated successfully.',
    type: ProductResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body.',
  })
  @ApiNotFoundResponse({
    description: 'Product not found.',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a product',
    description: 'Deletes a product from the catalog.',
  })
  @ApiNoContentResponse({
    description: 'Product deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Product not found.',
  })
  async delete(@Param('id') id: string) {
    await this.productsService.delete(id);
  }
}