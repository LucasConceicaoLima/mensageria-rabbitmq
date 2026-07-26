import { ApiProperty } from '@nestjs/swagger';

export class ProductSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}
