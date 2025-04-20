import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertaGlobalService } from '../shared/alerta-global.service';

export const RoleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const alerta = inject(AlertaGlobalService);
    const token = authService.getToken();

    if (!token) {
      router.navigate(['/login']);
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload?.rol;

    if (!allowedRoles.includes(userRole)) {
      console.log('No tienes permiso para ir a esa seccion')
      alerta.mostrar('error', 'No tienes permisos para acceder a esta sección');
      return false;
    }

    return true;
  };
};
