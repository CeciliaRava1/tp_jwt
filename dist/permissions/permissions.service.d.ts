import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
export declare class PermissionsService {
    private permissionRepo;
    constructor(permissionRepo: Repository<Permission>);
    create(name: string): Promise<Permission>;
    findAll(): Promise<Permission[]>;
}
