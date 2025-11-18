import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

export const RoleGuard = (rolesPermitidos: string[]): CanActivateFn => {
  return async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    try {
      const perfil = await auth.getProfile();  // ← reemplaza getUser()

      if (!perfil) {
        router.navigateByUrl('/login');
        return false;
      }

      if (!rolesPermitidos.includes(perfil.rol)) {
        router.navigateByUrl('/login');
        return false;
      }

      return true;

    } catch (err) {
      router.navigateByUrl('/login');
      return false;
    }
  };
};
