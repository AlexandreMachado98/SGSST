import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Organization } from '../organizations/organization.entity.js';
import { UserCompanyRole } from '../users/user-company-role.entity.js';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  organization_id: string;

  @ManyToOne(() => Organization, (org) => org.companies)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  cnpj: string;

  @OneToMany(() => UserCompanyRole, (role) => role.company)
  userRoles: UserCompanyRole[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
