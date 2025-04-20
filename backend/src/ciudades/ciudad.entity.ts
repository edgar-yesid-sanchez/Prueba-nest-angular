import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Departamento } from '../departamentos/departamento.entity';

@Entity()
export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Departamento, departamento => departamento.ciudades, {
    onDelete: 'CASCADE',
  })
  departamento: Departamento;
}