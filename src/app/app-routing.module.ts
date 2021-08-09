import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */

const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () =>
      import('./clients/clients.module').then((m) => m.ClientsModule),
  },
  {
    path: 'equipo',
    loadChildren: () => import('./team/team.module').then((m) => m.TeamModule),
  },
  {
    path: 'recursos',
    loadChildren: () =>
      import('./resources/resources.module').then((m) => m.ResourcesModule),
  },
  {
    path: 'inventario',
    loadChildren: () =>
      import('./inventory/inventory.module').then((m) => m.InventoryModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
