import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  
  @ApiProperty()
  @IsEmail()
  correo: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}