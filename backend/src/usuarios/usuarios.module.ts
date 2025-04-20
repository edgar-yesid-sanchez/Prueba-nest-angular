import { Module } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { UsersController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Compania } from 'src/companias/compania.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario,Compania])],
  providers: [UsuarioService],
  controllers: [UsersController],
  exports: [UsuarioService], 
})
export class UsersModule {}
