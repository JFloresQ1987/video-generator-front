import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes'),
  },
  {
    path: 'orders/:id',
    loadComponent: () => import('./features/orders/orders.component'),
  },
  {
    path: 'sales/:id',
    // path: 'sales',
    loadComponent: () => import('./features/sales/sales.component'),
  }, 
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component'),
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];
