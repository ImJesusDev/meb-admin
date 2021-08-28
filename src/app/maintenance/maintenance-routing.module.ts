import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Guards */
import { AuthGuard } from '../guards/auth.guard';

/* Components */
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MaintenancePendingComponent } from './maintenance-pending/maintenance-pending.component';
import { MaintenanceHistoryComponent } from './maintenance-history/maintenance-history.component';

const routes: Routes = [
  {
    path: 'mantenimientos',
    component: MaintenanceComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MaintenancePendingComponent },
      { path: 'historial', component: MaintenanceHistoryComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
