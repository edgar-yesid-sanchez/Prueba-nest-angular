import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { RoleGuard } from './core/role.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'inicio',
    canActivate: [
      AuthGuard
    ],
    component: LayoutComponent, 
    children: [
       {
        path: '',
        redirectTo: 'companias',
        pathMatch: 'full',
      },
      {
        path: 'companias',
        loadComponent: () => import('./companias/companias.component').then(m => m.CompaniasComponent),
      },
      {
        path: 'productos',
        loadComponent: () => import('./productos/productos.component').then(m => m.ProductosComponent),
      },
      {
        path: 'usuarios',
        canActivate: [RoleGuard(['admin'])],
        loadComponent: () => import('./usuarios/usuarios.component').then(m => m.UsuariosComponent),
      },
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
