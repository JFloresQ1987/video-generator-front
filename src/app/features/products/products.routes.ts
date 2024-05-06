import { Routes } from '@angular/router';

const routes: Routes = [  
  {
    path: '',
    loadComponent: () => import('./products.component'),
  },  
  // {
  //   path: 'models/:id',
  //   loadComponent: () => import('./models/models.component'),
  // },  
];
export default routes;
