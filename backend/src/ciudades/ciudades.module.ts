import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './ciudad.entity';
import { CiudadesService } from './ciudades.service';
import { CiudadesController } from './ciudades.controller';
import { DepartamentosModule } from '../departamentos/departamentos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ciudad]),
    DepartamentosModule,
  ],
  providers: [CiudadesService],
  controllers: [CiudadesController],
})
export class CiudadesModule {}
