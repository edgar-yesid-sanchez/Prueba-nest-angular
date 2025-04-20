import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from '../departamentos/departamento.entity';
import { Ciudad } from '../ciudades/ciudad.entity';
import { Compania } from 'src/companias/compania.entity';
import { Producto } from 'src/productos/producto.entity';
import { Usuario } from 'src/usuarios/usuario.entity';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Departamento, Ciudad, Usuario, Compania, Producto])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeedModule {}