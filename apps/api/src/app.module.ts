import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { OrganizationsModule } from './organizations/organizations.module.js';
import { CompaniesModule } from './companies/companies.module.js';
import { UsersModule } from './users/users.module.js';

import { Organization } from './organizations/organization.entity.js';
import { Company } from './companies/company.entity.js';
import { User } from './users/user.entity.js';
import { UserCompanyRole } from './users/user-company-role.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [Organization, Company, User, UserCompanyRole],
        synchronize: true, // Use apenas em dev!
        autoLoadEntities: true,
        logging: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    AuthModule,
    OrganizationsModule,
    CompaniesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
