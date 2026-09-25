import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity.js';
import { Company } from '../companies/company.entity.js';

@Entity('user_company_roles')
export class UserCompanyRole {
  @PrimaryColumn('uuid')
  user_id: string;

  @PrimaryColumn('uuid')
  company_id: string;

  @ManyToOne(() => User, (user) => user.companyRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Company, (company) => company.userRoles)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ type: 'varchar', length: 50 })
  role: string;
}
