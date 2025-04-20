import { Controller, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './ciudad.entity';
import { Roles } from 'src/auth/guard/roles.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('ciudades')
export class CiudadesController {
  constructor(
    @InjectRepository(Ciudad)
    private readonly repo: Repository<Ciudad>,
  ) {}

  @Get('por-departamento')
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Obtener las ciudades de un departamento' })
  @ApiResponse({ status: 200, description: 'Listado de ciudades' })
  async findAll(@Query('departamentoId') departamentoId?: number) {
    if (departamentoId) {
      return await this.repo.find({
        where: {
          departamento: {
            id: departamentoId,
          },
        },
        relations: ['departamento'],
      });
    }

    return await this.repo.find({ relations: ['departamento'] });
  }
}
