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
import { UsuarioService } from './usuarios.service';
import { CreateUserDto } from './usuario.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Roles } from '../auth/guard/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Usuarios')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('usuarios')
export class UsersController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @Roles('admin','user')
  @ApiOperation({ summary: 'Listar usuarios' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Crear usuario (admin)' })
  create(@Body() dto: CreateUserDto) {
    return this.usuarioService.create(dto);
  }

  @Get(':id')
  @Roles('admin','user')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findById(+id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: number, @Body() dto: CreateUserDto) {
    return this.usuarioService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }
}
