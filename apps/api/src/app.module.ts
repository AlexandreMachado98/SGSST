import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { OrganizationsModule } from './organizations/organizations.module.js';
import { CompaniesModule } from './companies/companies.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [AuthModule, OrganizationsModule, CompaniesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
