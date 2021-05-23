import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Components */
import { ClientsComponent } from './clients/clients.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'clientes',
    component: ClientsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ClientListComponent,
      },
      {
        path: ':id',
        component: ClientFormComponent,
      },
      {
        path: 'nuevo-cliente',
        component: ClientFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
