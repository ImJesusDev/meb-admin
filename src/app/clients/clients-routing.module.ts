import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Components */
import { ClientsComponent } from './clients/clients.component';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'clientes',
    component: ClientsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
