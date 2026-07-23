import { ApiProperty } from '@nestjs/swagger';
import { ProductSummaryDto } from './product-summary.dto';

export class OrderItemResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    type: ProductSummaryDto,
  })
  product!: ProductSummaryDto;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  unitPrice!: number;

  @ApiProperty()
  subtotal!: number;
}