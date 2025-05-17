import { RolesService } from './roles.service';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    create(body: {
        name: string;
    }): Promise<import("./role.entity").Role>;
    findAll(): Promise<import("./role.entity").Role[]>;
}
