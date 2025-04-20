import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Compania } from '../companias/compania.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  cargo: string;

  @Column('decimal')
  salario: number;

  @Column()
  telefono: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  rol: string;

  @ManyToOne(() => Compania, compania => compania.usuarios, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  compania: Compania;
}