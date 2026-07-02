import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    example: 'cmc5q0h3b0000j7m0o4m4k6x8',
  })
  @IsString()
  productId!: string;

  @ApiProperty({
    example: 2,
  })
  @IsInt()
  @IsPositive()
  quantity!: number;
}