import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Departamento } from '../departamentos/departamento.entity';
import { Ciudad } from '../ciudades/ciudad.entity';
import { Producto } from '../productos/producto.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Entity()
export class Compania {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  sector: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;

  @Column()
  activos: number;

  @Column()
  pasivos: number;

  @ManyToOne(() => Ciudad, { eager: true })
  ciudad: Ciudad;

  @ManyToOne(() => Departamento, { eager: true })
  departamento: Departamento;

  @OneToMany(() => Usuario, Usuario => Usuario.compania)
  usuarios: Usuario[];

  @OneToMany(() => Producto, Producto => Producto.compania)
  productos: Producto[];
}