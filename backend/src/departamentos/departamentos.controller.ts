import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/roles.decorator';
import { DepartamentosService } from './departamentos.service';

@Controller('departamentos')
export class DepartamentosController {
  constructor(
    private readonly service: DepartamentosService,
  ) {}

  @Get()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Obtener todos los departametos' })
  @ApiResponse({ status: 200, description: 'Listado de compañías' })
  async findAll() {
    return this.service.findAll();
  }
}
