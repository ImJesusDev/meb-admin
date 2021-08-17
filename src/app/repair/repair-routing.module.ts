import { RepairHistoryComponent } from './repair-history/repair-history.component';
import { RepairPendingComponent } from './repair-pending/repair-pending.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Guards */
import { AuthGuard } from '../guards/auth.guard';

/* Components */
import { RepairComponent } from './repair/repair.component';

const routes: Routes = [
  {
    path: 'reparaciones',
    component: RepairComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RepairPendingComponent },
      { path: 'historial', component: RepairHistoryComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairRoutingModule { }
