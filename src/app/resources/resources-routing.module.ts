import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Components */
import { ResourcesComponent } from './resources/resources.component';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { ResourcesFormComponent } from './resources-form/resources-form.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'recursos',
    component: ResourcesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ResourcesListComponent },
      { path: 'nuevo-recurso', component: ResourcesFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule {}
