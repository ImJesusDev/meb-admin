import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Components */
import { ClientsComponent } from './clients/clients.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { OfficeFormComponent } from './office-form/office-form.component';
import { OfficesListComponent } from './offices-list/offices-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from '../guards/auth.guard';
import { ActiveUserListComponent } from './users/active-user-list/active-user-list.component';
import { InactiveUserListComponent } from './users/inactive-user-list/inactive-user-list.component';

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
        path: ':id/editar',
        component: ClientFormComponent,
      },
      {
        path: ':id/crear-sede',
        component: OfficeFormComponent,
      },
      {
        path: ':id/sedes',
        component: OfficesListComponent,
      },
      {
        path: 'nuevo-cliente',
        component: ClientFormComponent,
      },
      {
        path: ':id/crear-usuario',
        component: UserFormComponent,
      },
      {
        path: ':id/usuarios',
        component: UserListComponent,
      },
      {
        path: ':id/usuarios/:userId/editar',
        component: UserFormComponent,
      },
      {
        path: ':id/usuarios/activos',
        component: ActiveUserListComponent,
      },
      {
        path: ':id/usuarios/inactivos',
        component: InactiveUserListComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule { }
