import { Routes } from '@angular/router';

const routes: Routes = [  
  {
    path: '',
    loadComponent: () => import('./categories.component'),
  }
];
export default routes;
