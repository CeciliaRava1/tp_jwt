import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator'; 

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('roles_create') // <- Protección
  create(@Body() body: { name: string }) {
    return this.rolesService.create(body.name);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }
}
