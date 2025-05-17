import { BaseEntity } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
export declare class Role extends BaseEntity {
    id: number;
    name: string;
    users: UserEntity[];
    permissions: string[];
}
