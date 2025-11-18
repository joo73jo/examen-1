import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [

  // PANTALLAS PÚBLICAS (INVITADO)
  {
    path: '',
    redirectTo: 'catalogo',
    pathMatch: 'full'
  },
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./pages/catalogo/catalogo.page').then(m => m.CatalogoPage)
  },
  {
    path: 'detalle/:id',
    loadComponent: () =>
      import('./pages/detalle-plan/detalle-plan.page').then(m => m.DetallePlanPage)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.page').then(m => m.RegistroPage)
  },

  // USUARIO REGISTRADO
  {
    path: 'usuario/catalogo',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/catalogo/catalogo.page').then(m => m.CatalogoPage)
  },
  {
    path: 'usuario/detalle/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/detalle-plan/detalle-plan.page').then(m => m.DetallePlanPage)
  },
  {
    path: 'usuario/mis-contrataciones',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/usuario/mis-contrataciones/mis-contrataciones.page').then(m => m.MisContratacionesPage)
  },
  {
    path: 'usuario/chat/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/usuario/chat/chat.page').then(m => m.ChatPage)
  },
  {
    path: 'usuario/perfil',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/usuario/perfil/perfil.page').then(m => m.PerfilUsuarioPage)
  },

  // ASESOR COMERCIAL
  {
    path: 'asesor/dashboard',
    canActivate: [AuthGuard, RoleGuard(['asesor_comercial'])],
    loadComponent: () =>
      import('./pages/asesor/planes-lista/planes-lista.page').then(m => m.PlanesListaPage)
  },
  {
    path: 'asesor/planes/crear',
    canActivate: [AuthGuard, RoleGuard(['asesor_comercial'])],
    loadComponent: () =>
      import('./pages/asesor/plan-crear/plan-crear.page').then(m => m.PlanCrearPage)
  },
  {
    path: 'asesor/planes/editar/:id',
    canActivate: [AuthGuard, RoleGuard(['asesor_comercial'])],
    loadComponent: () =>
      import('./pages/asesor/plan-editar/plan-editar.page').then(m => m.PlanEditarPage)
  },
  {
    path: 'asesor/contrataciones',
    canActivate: [AuthGuard, RoleGuard(['asesor_comercial'])],
    loadComponent: () =>
      import('./pages/asesor/contrataciones-lista/contrataciones-lista.page').then(m => m.ContratacionesListaPage)
  },
  {
    path: 'asesor/chat/:id',
    canActivate: [AuthGuard, RoleGuard(['asesor_comercial'])],
    loadComponent: () =>
      import('./pages/asesor/chat/chat.page').then(m => m.ChatAsesorPage)
  },
  {
    path: 'asesor/perfil',
    canActivate: [AuthGuard, RoleGuard(['asesor_comercial'])],
    loadComponent: () =>
      import('./pages/asesor/perfil/perfil.page').then(m => m.PerfilAsesorPage)
  }
];
