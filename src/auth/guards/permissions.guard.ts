import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );
    if (!requiredPermission) {
      return true;
    }

    // Simulación: Extraemos permisos del "usuario simulado"
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Para test: asumimos que el usuario tiene todos los permisos
    // Reemplazá esta lógica por algo real después
    const userPermissions = user?.permissions || [];

    return userPermissions.includes(requiredPermission);
  }
}

