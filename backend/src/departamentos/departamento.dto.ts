import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartamentoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;
}