import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ciudad } from '../ciudades/ciudad.entity';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Ciudad, ciudad => ciudad.departamento)
  ciudades: Ciudad[];
}
