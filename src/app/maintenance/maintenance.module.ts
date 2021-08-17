import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Components */
import { ModalModule } from '@atoms/modal';
import { SharedModule } from '@shared/shared.module';
import { CheckUpModalModule } from '@molecules/check-up-modal/check-up-modal.module';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MaintenancePendingComponent } from './maintenance-pending/maintenance-pending.component';
import { MaintenanceHistoryComponent } from './maintenance-history/maintenance-history.component';


@NgModule({
  declarations: [
    MaintenanceComponent,
    MaintenanceHistoryComponent,
    MaintenancePendingComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    ModalModule,
    SharedModule,
    CheckUpModalModule
  ]
})
export class MaintenanceModule { }
