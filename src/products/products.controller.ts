import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'This action adds a new product';
  }

  @Get()
  findAllProducts() {
    return 'This action returns all products';
  }

  @Get(':id')
  findOneProduct() {
    return 'This action returns a product';
  }

  @Patch(':id')
  updateProduct() {
    return 'This action updates a product';
  }

  @Delete(':id')
  deleteProduct() {
    return 'This action removes a product';
  }
}
