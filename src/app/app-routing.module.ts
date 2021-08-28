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
    path: 'check-ups',
    loadChildren: () =>
      import('./check-ups/check-ups.module').then((m) => m.CheckUpsModule),
  },
  {
    path: 'mantenimientos',
    loadChildren: () =>
      import('./maintenance/maintenance.module').then((m) => m.MaintenanceModule),
  },
  {
    path: 'aprobaciones',
    loadChildren: () =>
      import('./approvals/approvals.module').then((m) => m.ApprovalsModule),
  },
  {
    path: 'reparaciones',
    loadChildren: () =>
      import('./repair/repair.module').then((m) => m.RepairModule),
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
