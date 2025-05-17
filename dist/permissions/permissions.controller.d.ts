import { PermissionsService } from './permissions.service';
export declare class PermissionsController {
    private permissionsService;
    constructor(permissionsService: PermissionsService);
    create(body: {
        name: string;
    }): Promise<import("./permission.entity").Permission>;
    findAll(): Promise<import("./permission.entity").Permission[]>;
}
