import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Permission } from './permission.entity';

@Injectable()
export class PermissionsService {
  constructor(@InjectRepository(Permission) private permissionRepo: Repository<Permission>) {}

  async create(name: string): Promise<Permission> {
    const permission = this.permissionRepo.create({ name });
    return this.permissionRepo.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepo.find();
  }
}
