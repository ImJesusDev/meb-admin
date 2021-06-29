import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Components */
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { ClientAdminListComponent } from './client-admin-list/client-admin-list.component';
import { ClientAdminFormComponent } from './client-admin-form/client-admin-form.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'equipo',
    component: TeamComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: TeamListComponent,
      },
      {
        path: 'admin-clientes',
        component: ClientAdminListComponent,
      },
      {
        path: 'admin-clientes/nuevo',
        component: ClientAdminFormComponent,
      },
      {
        path: 'nuevo-miembro',
        component: TeamFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
