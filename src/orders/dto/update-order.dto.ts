import { OrderStatus, OrderStatusList } from 'src/orders/enum/order.enum';
import { IsEnum } from 'class-validator';

export class ChangeOrderStatusDto {
  @IsEnum(OrderStatusList, {
    message: `Status must be one of the following: ${OrderStatusList.join(', ')}`,
  })
  status: OrderStatus;
}
