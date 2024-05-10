import { Routes } from '@angular/router';

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
  },
  {
    path: 'sales/:id',    
    loadComponent: () => import('./features/sales/sales.component'),
  }, 
  {
    path: 'edits/:id',    
    loadComponent: () => import('./features/edits/edits.component'),
  }, 
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: '**', redirectTo: 'categories', pathMatch: 'full' },
];
