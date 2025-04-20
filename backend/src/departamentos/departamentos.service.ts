import { Injectable } from '@nestjs/common';
import { Departamento } from './departamento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentosService {

  constructor(
    @InjectRepository(Departamento)
    private readonly repo: Repository<Departamento>,
  ) {}

  async findAll() {
    return await this.repo.find();
  }
}
