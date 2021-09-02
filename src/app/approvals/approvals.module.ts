import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Components */
import { ModalModule } from '@atoms/modal';
import { SharedModule } from '@shared/shared.module';
import { CheckUpModalModule } from '@molecules/check-up-modal/check-up-modal.module';

import { ApprovalsRoutingModule } from './approvals-routing.module';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ApprovalsHistoryComponent } from './approvals-history/approvals-history.component';
import { ApprovalsPendingComponent } from './approvals-pending/approvals-pending.component';
import { ApprovalsPendingRepairComponent } from './approvals-pending-repair/approvals-pending-repair.component';
import { ApprovalsHistoryRepairComponent } from './approvals-history-repair/approvals-history-repair.component';


@NgModule({
  declarations: [
    ApprovalsComponent,
    ApprovalsHistoryComponent,
    ApprovalsPendingComponent,
    ApprovalsPendingRepairComponent,
    ApprovalsHistoryRepairComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApprovalsRoutingModule,
    ModalModule,
    SharedModule,
    CheckUpModalModule
  ]
})
export class ApprovalsModule { }
