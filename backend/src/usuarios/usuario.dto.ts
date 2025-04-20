import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  apellido: string;

  @ApiProperty()
  @IsString()
  cargo: string;

  @ApiProperty()
  @IsNumber()
  salario: number;

  @ApiProperty()
  @IsString()
  telefono: string;

  @ApiProperty()
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'admin', enum: ['admin', 'user'] })
  @IsString()
  rol: string;

  @ApiProperty()
  @IsNumber()
  companiaId: number;
}
