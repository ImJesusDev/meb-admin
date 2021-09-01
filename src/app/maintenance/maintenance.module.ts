import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
/* State */
import { reducers, effects } from './state';

/* Components */
import { ModalModule } from '@atoms/modal';
import { SharedModule } from '@shared/shared.module';
import { CheckUpModalModule } from '@molecules/check-up-modal/check-up-modal.module';
import { ComponentCommentaryModalModule } from '@molecules/component-commentary-modal/component-commentary-modal.module';

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
    FormsModule,
    ReactiveFormsModule,
    MaintenanceRoutingModule,
    ModalModule,
    SharedModule,
    CheckUpModalModule,
    StoreModule.forFeature('maintenance', reducers),
    EffectsModule.forFeature(effects),
    ComponentCommentaryModalModule,
  ]
})
export class MaintenanceModule { }
