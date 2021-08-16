import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Guards */
import { AuthGuard } from '../guards/auth.guard';

/* Components */
import { CheckUpsComponent } from './check-ups/check-ups.component';

const routes: Routes = [
  {
    path: 'check-ups',
    component: CheckUpsComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: '', component: InventoryListComponent },
      // { path: 'nuevo-recurso', component: InventoryFormComponent },
      // { path: ':resourceId/documents', component: DocumentsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckUpsRoutingModule { }
