import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Mouse Gamer' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ example: 'Mouse RGB com 6 botões' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 199.9 })
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({ example: 30 })
  @IsInt()
  @Min(0)
  stock!: number;
}
