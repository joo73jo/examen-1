import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

export const AuthGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  try {
    const perfil = await auth.getProfile();  // ← reemplaza getUser()

    if (!perfil) {
      router.navigateByUrl('/login');
      return false;
    }

    return true;

  } catch (e) {
    router.navigateByUrl('/login');
    return false;
  }
};
