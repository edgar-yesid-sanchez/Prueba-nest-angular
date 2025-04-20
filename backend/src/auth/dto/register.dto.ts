import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty()
  @IsEmail()
  correo: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: ['user', 'admin'], default: 'user' })
  @IsNotEmpty()
  rol: string;
}