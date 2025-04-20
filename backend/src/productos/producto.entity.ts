import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Compania } from '../companias/compania.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  categoria: string;

  @Column('decimal')
  precio: number;

  @ManyToOne(() => Compania, compania => compania.productos, { onDelete: 'SET NULL' })
  compania: Compania;
}