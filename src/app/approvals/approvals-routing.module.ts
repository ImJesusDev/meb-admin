import { ApprovalsHistoryComponent } from './approvals-history/approvals-history.component';
import { ApprovalsPendingComponent } from './approvals-pending/approvals-pending.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


/* Guards */
import { AuthGuard } from '../guards/auth.guard';

/* Components */
import { ApprovalsComponent } from './approvals/approvals.component';
import { ApprovalsPendingRepairComponent } from './approvals-pending-repair/approvals-pending-repair.component';
import { ApprovalsHistoryRepairComponent } from './approvals-history-repair/approvals-history-repair.component';

const routes: Routes = [
  {
    path: 'aprobaciones',
    component: ApprovalsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ApprovalsPendingComponent },
      { path: 'maintenance', component: ApprovalsPendingComponent },
      { path: 'repair', component: ApprovalsPendingRepairComponent },
      { path: 'historial', component: ApprovalsHistoryComponent },
      { path: 'historial-reparaciones', component: ApprovalsHistoryRepairComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalsRoutingModule { }
