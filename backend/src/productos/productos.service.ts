import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './producto.dto';
import { Compania } from 'src/companias/compania.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
    @InjectRepository(Compania)
    private readonly companiaRepo: Repository<Compania>,
  ) {}

  async findAll() {
    return this.productoRepo.find({ relations: ['compania'] });
  }

  async findOne(id: number) {
    const producto = await this.productoRepo.findOne({
      where: { id },
      relations: ['compania'],
    });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async create(dto: CreateProductoDto) {
    const nuevo = this.productoRepo.create(dto);
    return this.productoRepo.save(nuevo);
  }

  async update(id: number, dto: CreateProductoDto) {
    const producto = await this.productoRepo.findOne({ where: { id } });
    if (!producto) throw new NotFoundException('Producto no encontrado');
  
    const compania = await this.companiaRepo.findOne({ where: { id: dto.companiaId } });
    if (!compania) throw new NotFoundException('Compañía no encontrada');
  
    Object.assign(producto, {
      ...dto,
      compania,
    });
  
    return this.productoRepo.save(producto);
  }

  async remove(id: number) {
    return this.productoRepo.delete(id);
  }
}
