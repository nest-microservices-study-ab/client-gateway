import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: any) {
    return `This action adds a new product with ${JSON.stringify(createProductDto)}`;
  }

  @Get()
  findAllProducts() {
    const products = this.productsClient.send({ cmd: 'find_all_products' }, {});

    return products;
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
