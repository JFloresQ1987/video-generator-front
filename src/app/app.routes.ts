import { Routes } from '@angular/router';
import { AuthorizationGuard } from '@shared/guards/authorization.guard';
import { PaymentGuard } from '@shared/guards/payment.guard';
import { PreviewGuard } from '@shared/guards/preview.guard';
import { Error404Component } from './layout/error404/error404.component';

export const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./features/categories/categories.routes'),
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./features/products/products.routes'),    
  },
  {
    path: 'models/:id',
    loadComponent: () => import('./features/models/models.component'),
  },
  {
    path: 'orders/:id',
    loadComponent: () => import('./features/orders/orders.component'),    
  },
  {
    path: 'previews/:id',
    loadComponent: () => import('./features/previews/previews.component'),
    canActivate: [PreviewGuard],
  },
  {
    path: 'sales/:id',
    loadComponent: () => import('./features/sales/sales.component'),
    canActivate: [PaymentGuard],
  },
  {
    path: 'edits/:id',
    loadComponent: () => import('./features/edits/edits.component'),
    canActivate: [PaymentGuard],
  },
  {
    path: 'cancel',
    loadComponent: () => import('./layout/cancel/cancel.component'),    
  },
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  // { path: '**', redirectTo: 'categories', pathMatch: 'full' },
  // { path: '**', redirectTo: Error404Component, pathMatch: 'full' },
  { path: '**', component: Error404Component },
  
];
