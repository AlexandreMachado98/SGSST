import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { Company } from '../companies/company.entity.js';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  cnpj: string;

  @Column({ type: 'varchar', default: 'ACTIVE' })
  status: string;

  @OneToMany(() => Company, (company) => company.organization)
  companies: Relation<Company>[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
