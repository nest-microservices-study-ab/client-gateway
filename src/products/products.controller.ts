import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct(@Body() createProductDto: any) {
    return `This action adds a new product with ${JSON.stringify(createProductDto)}`;
  }

  @Get()
  findAllProducts() {
    return 'This action returns all products';
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return `This action returns a product with id: ${id}`;
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: any) {
    return `This action updates a product with id: ${id} with ${JSON.stringify(updateProductDto)}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `This action removes a product with id: ${id}`;
  }
}
