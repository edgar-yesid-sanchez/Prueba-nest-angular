import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  categoria: string;

  @ApiProperty()
  @IsNumber()
  precio: number;

  @ApiProperty()
  @IsNumber()
  companiaId: number;
}