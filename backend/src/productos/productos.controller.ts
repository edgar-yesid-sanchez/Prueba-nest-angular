import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './producto.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Roles } from '../auth/guard/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Productos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  @Roles('admin','user')
  @ApiOperation({ summary: 'Listar productos' })
  findAll() {
    return this.productosService.findAll();
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Crear producto' })
  create(@Body() dto: CreateProductoDto) {
    return this.productosService.create(dto);
  }

  @Get(':id')
  @Roles('admin','user')
  findOne(@Param('id') id: number) {
    return this.productosService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() dto: CreateProductoDto) {
    return this.productosService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.productosService.remove(+id);
  }
}
