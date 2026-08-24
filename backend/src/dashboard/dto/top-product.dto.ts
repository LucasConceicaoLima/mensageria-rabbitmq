import { ApiProperty } from '@nestjs/swagger';

export class TopProductDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  productName!: string;

  @ApiProperty()
  quantitySold!: number;
}
