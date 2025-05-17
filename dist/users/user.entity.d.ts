import { Role } from 'src/roles/role.entity';
import { BaseEntity } from 'typeorm';
export declare class UserEntity extends BaseEntity {
    id: number;
    email: string;
    password: string;
    roles: Role[];
    get permissionCodes(): string[];
}
