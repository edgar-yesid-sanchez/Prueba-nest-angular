import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CompaniasService } from './companias.service';
import { CreateCompaniaDto } from './compania.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/guard/roles.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Compañías')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('companias')
export class CompaniasController {
  constructor(private readonly companiasService: CompaniasService) {}

  @Get()
  @Roles('admin','user')
  @ApiOperation({ summary: 'Obtener todas las compañías' })
  @ApiResponse({ status: 200, description: 'Listado de compañías' })
  findAll() {
    return this.companiasService.findAll();
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Crear una nueva compañía' })
  @ApiResponse({ status: 201, description: 'Compañía creada' })
  create(@Body() dto: CreateCompaniaDto) {
    return this.companiasService.create(dto);
  }

  @Get(':id')
  @Roles('admin','user')
  @ApiOperation({ summary: 'Obtener compañía por ID' })
  findOne(@Param('id') id: number) {
    return this.companiasService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Actulizar una compañía' })
  update(@Param('id') id: number, @Body() dto: CreateCompaniaDto) {
    return this.companiasService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar una compañía' })
  remove(@Param('id') id: number) {
    return this.companiasService.remove(+id);
  }
}
