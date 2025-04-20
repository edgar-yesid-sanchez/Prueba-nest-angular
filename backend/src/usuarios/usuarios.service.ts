import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUserDto } from './usuario.dto';
import { Compania } from 'src/companias/compania.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    @InjectRepository(Compania)
    private readonly companiaRepository: Repository<Compania>,
  ) {}

  async create(data: Partial<Usuario>): Promise<Usuario> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findByEmail(correo: string): Promise<Usuario | null> {
    return this.userRepository.findOne({ where: { correo } });
  }

  async findById(id: number): Promise<Usuario | null> {
    return this.userRepository.findOne({ where: { id }, relations: ['compania'], });
  }

  async findAll(): Promise<Usuario[]> {
    return this.userRepository.find({relations: ['compania']});
  }

  async update(id: number, dto: CreateUserDto) {
    const usuario = await this.userRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
  
    let compania;
    if (dto.companiaId) {
      compania = await this.companiaRepository.findOne({ where: { id: dto.companiaId } });
      if (!compania) throw new NotFoundException('Compañía no encontrada');
    }else{
      throw new NotFoundException('Compañía no encontrada');
    }
  
    Object.assign(usuario, {
      ...dto,
      compania,
    });
  
    return await this.userRepository.save(usuario);
  }
  
  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
