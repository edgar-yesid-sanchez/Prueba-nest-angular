import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateCompaniaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sector: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  telefono: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ciudadId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  departamentoId: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  activos: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  pasivos: number;
}
