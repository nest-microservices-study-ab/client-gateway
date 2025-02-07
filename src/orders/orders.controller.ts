import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  ChangeOrderStatusDto,
  CreateOrderDto,
  OrderPaginationDto,
} from './dto';

import { NATS_SERVICE } from 'src/config';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await firstValueFrom(
        this.client.send(
          {
            cmd: 'create_order',
          },
          { ...createOrderDto },
        ),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.client.send({ cmd: 'find_all_orders' }, orderPaginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send({ cmd: 'find_one_order' }, { id }),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
  ) {
    try {
      const updatedOrder = await firstValueFrom(
        this.client.send(
          { cmd: 'change_order_status' },
          { id, ...changeOrderStatusDto },
        ),
      );

      return updatedOrder;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
