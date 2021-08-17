import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Components */
import { ModalModule } from '@atoms/modal';
import { SharedModule } from '@shared/shared.module';
import { CheckUpModalModule } from '@molecules/check-up-modal/check-up-modal.module';

import { ApprovalsRoutingModule } from './approvals-routing.module';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ApprovalsHistoryComponent } from './approvals-history/approvals-history.component';
import { ApprovalsPendingComponent } from './approvals-pending/approvals-pending.component';


@NgModule({
  declarations: [
    ApprovalsComponent,
    ApprovalsHistoryComponent,
    ApprovalsPendingComponent
  ],
  imports: [
    CommonModule,
    ApprovalsRoutingModule,
    ModalModule,
    SharedModule,
    CheckUpModalModule
  ]
})
export class ApprovalsModule { }
