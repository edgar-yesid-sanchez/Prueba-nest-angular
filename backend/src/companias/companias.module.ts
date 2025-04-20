import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniasController } from './companias.controller';
import { CompaniasService } from './companias.service';
import { Compania } from './compania.entity';
import { Ciudad } from 'src/ciudades/ciudad.entity';
import { Departamento } from 'src/departamentos/departamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compania,Ciudad,Departamento])],
  controllers: [CompaniasController],
  providers: [CompaniasService],
})
export class CompaniasModule {}