import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permissions } from 'src/auth/decorators/permissions.decorator';


@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions('permissions_create')
  create(@Body() body: { name: string }) {
    return this.permissionsService.create(body.name);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }
}
