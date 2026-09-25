import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { OrganizationsService } from './organizations.service.js';
import { AuthGuard } from '../auth/auth/auth.guard.js';

@Controller('organizations')
@UseGuards(AuthGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  getOrganizations(@Req() req) {
    // Aqui garantimos que só chega se tiver token válido.
    // req.user contém o UID do Firebase Auth e as Custom Claims.
    return {
      message: 'Organizações retornadas com sucesso',
      user: req.user,
      data: []
    };
  }
}
