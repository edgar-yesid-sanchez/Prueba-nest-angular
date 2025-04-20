import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compania } from './compania.entity';
import { Repository } from 'typeorm';
import { CreateCompaniaDto } from './compania.dto';
import { Ciudad } from 'src/ciudades/ciudad.entity';
import { Departamento } from 'src/departamentos/departamento.entity';

@Injectable()
export class CompaniasService {
  constructor(
    @InjectRepository(Compania)
    private readonly companiaRepo: Repository<Compania>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepo: Repository<Ciudad>,
    @InjectRepository(Departamento)
    private readonly departamentoRepo: Repository<Departamento>,
  ) {}

  async findAll() {
    return this.companiaRepo.find({ relations: ['ciudad', 'departamento'] });
  }

  async findOne(id: number) {
    const compania = await this.companiaRepo.findOne({
      where: { id },
      relations: ['ciudad', 'departamento', 'usuarios', 'productos'],
    });
    if (!compania) throw new NotFoundException('Compañía no encontrada');
    return compania;
  }

  async create(dto: CreateCompaniaDto) {

    const ciudad = await this.ciudadRepo.findOne({ where: { id: dto.ciudadId } });
    if (!ciudad) throw new Error('Ciudad no encontrada');
    const departamento = await this.departamentoRepo.findOne({ where: { id: dto.departamentoId } });
    if (!departamento) throw new Error('Departamento no encontrado');
  
    const nueva = this.companiaRepo.create({
      nombre: dto.nombre,
      sector: dto.sector,
      telefono: dto.telefono,
      direccion: dto.direccion,
      activos: dto.activos,
      pasivos: dto.pasivos,
      ciudad,
      departamento,
    });

    return this.companiaRepo.save(nueva);
  }

  async update(id: number, dto: CreateCompaniaDto) {
    const compania = await this.companiaRepo.findOne({ where: { id } });
    if (!compania) throw new NotFoundException('Compañía no encontrada');

    const ciudad = await this.ciudadRepo.findOne({ where: { id: dto.ciudadId } });
    const departamento = await this.departamentoRepo.findOne({ where: { id: dto.departamentoId } });

    if (!ciudad) throw new NotFoundException('Ciudad no encontrada');
    if (!departamento) throw new NotFoundException('Departamento no encontrado');

    Object.assign(compania, {
      nombre: dto.nombre,
      sector: dto.sector,
      telefono: dto.telefono,
      direccion: dto.direccion,
      activos: dto.activos,
      pasivos: dto.pasivos,
      ciudad,
      departamento,
    });

    return this.companiaRepo.save(compania); // hace UPDATE
  }

  async remove(id: number) {
    return this.companiaRepo.delete(id);
  }
}
