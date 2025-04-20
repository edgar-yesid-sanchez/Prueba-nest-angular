import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from '../departamentos/departamento.entity';
import { Ciudad } from '../ciudades/ciudad.entity';
import { Compania } from '../companias/compania.entity';
import { Producto } from '../productos/producto.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Index, Repository } from 'typeorm';
import _departamentosJson from './departamentos.json';
import _companiasJson from './companias.json';
import _productosJson from './productos.json';
import _usuariosJson from './usuarios.json';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepo: Repository<Departamento>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepo: Repository<Ciudad>,
    @InjectRepository(Compania)
    private readonly companiaRepo: Repository<Compania>,
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async seed() {
    const departamentosJson = _departamentosJson as { nombre: string; ciudades: { nombre: string }[] }[];
    const companiasJson = _companiasJson as Compania[];
    const productosJson = _productosJson as Producto[];
    const usuariosJson = _usuariosJson as Usuario[];
    
    for (const dep of departamentosJson) {
      let departamento = await this.departamentoRepo.findOne({ where: { nombre: dep.nombre } });

      if (!departamento) {
        departamento = this.departamentoRepo.create({ nombre: dep.nombre });
        departamento = await this.departamentoRepo.save(departamento);
      }

      for (const ciudad of dep.ciudades) {
        const ciudadExists = await this.ciudadRepo.findOne({
          where: { nombre: ciudad.nombre },
        });

        if (!ciudadExists) {
          const nueva = this.ciudadRepo.create({
            nombre: ciudad.nombre,
            departamento,
          });
          await this.ciudadRepo.save(nueva);
        }
      }
    }

    // Crear usuario ADMIN de prueba
    const existingAdmin = await this.usuarioRepo.findOne({ where: { correo: 'admin@correo.com' } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('123456', 10);

      const dataAdminUser: RegisterDto = {
        nombre: 'Admin',
        apellido: 'Root',
        correo: 'admin@correo.com',
        password: hashedPassword,
        rol: 'admin'
      }

      const admin = this.usuarioRepo.create(dataAdminUser);
      await this.usuarioRepo.save(admin);

      console.log('✅ Usuarios de prueba creados');
    }

    // Crear compañías
    const ciudad = await this.ciudadRepo.findOne({ where: { nombre: 'Bogotá' } , relations: ['departamento'] });
   
    for (const compa of companiasJson) {
      const exists = await this.companiaRepo.findOne({ where: { nombre: compa.nombre } });
      if (!exists) {
        const compania = this.companiaRepo.create({
          ...compa,
          ciudad: { id: ciudad?.id },
          departamento: { id: ciudad?.departamento.id },
        });
        await this.companiaRepo.save(compania);
      }
    }

    // consultar todas las compañías para crear y vincular productos y usuarios
    const companias = await this.companiaRepo.find();
    
    // Crear productos
    for (const [i,p] of productosJson.entries()) {
      const exists = await this.productoRepo.findOne({ where: { nombre: p.nombre } });
      if (!exists) {
        const companiaIndex = Math.floor(i / 2);
        const compania = companias[companiaIndex];
        if (compania) {
          const producto = this.productoRepo.create({ ...p, compania });
          await this.productoRepo.save(producto);
        }
      }
    }

    // Crear usuarios
    for (const [i,u] of usuariosJson.entries()) {
      const exists = await this.usuarioRepo.findOne({ where: { correo: u.correo } });
      if (!exists) {
        const companiaIndex = Math.floor(i / 2);
        const compania = companias[companiaIndex];
        const hashed = await bcrypt.hash(u.password, 10);
        const usuario = this.usuarioRepo.create({
          ...u,
          password: hashed,
          compania,
        });
        await this.usuarioRepo.save(usuario);
      }
    }

    console.log('✅ Seed completado');
  }
}
