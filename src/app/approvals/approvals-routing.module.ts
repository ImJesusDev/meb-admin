import { ApprovalsHistoryComponent } from './approvals-history/approvals-history.component';
import { ApprovalsPendingComponent } from './approvals-pending/approvals-pending.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


/* Guards */
import { AuthGuard } from '../guards/auth.guard';

/* Components */
import { ApprovalsComponent } from './approvals/approvals.component';

const routes: Routes = [
  {
    path: 'aprovaciones',
    component: ApprovalsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ApprovalsPendingComponent },
      { path: 'historial', component: ApprovalsHistoryComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalsRoutingModule { }
