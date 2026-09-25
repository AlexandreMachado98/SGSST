import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { UserCompanyRole } from './user-company-role.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  firebase_uid: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @OneToMany(() => UserCompanyRole, (role) => role.user)
  companyRoles: Relation<UserCompanyRole>[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
