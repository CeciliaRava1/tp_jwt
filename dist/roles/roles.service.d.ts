import { Repository } from 'typeorm';
import { Role } from './role.entity';
export declare class RolesService {
    private roleRepo;
    constructor(roleRepo: Repository<Role>);
    create(name: string): Promise<Role>;
    findAll(): Promise<Role[]>;
}
