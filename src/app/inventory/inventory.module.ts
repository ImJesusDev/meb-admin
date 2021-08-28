import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Libs */
import { QrCodeModule } from 'ng-qrcode';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/* General Components */
import { ContainerModule } from '@atoms/container/container.module';
import { SharedModule } from '@shared/shared.module';
import { BackArrowModule } from '@atoms/back-arrow';
import { ModalModule } from '@atoms/modal';
import { CheckUpModalModule } from '@molecules/check-up-modal/check-up-modal.module';

/* State */
import { reducers, effects } from './state';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { DocumentsComponent } from './documents/documents.component';
import { CheckUpsHistoryComponent } from './check-ups-history/check-ups-history.component';


@NgModule({
  declarations: [
    InventoryComponent,
    InventoryListComponent,
    InventoryFormComponent,
    DocumentsComponent,
    CheckUpsHistoryComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InventoryRoutingModule,
    StoreModule.forFeature('inventory', reducers),
    EffectsModule.forFeature(effects),
    ContainerModule,
    SharedModule,
    BackArrowModule,
    QrCodeModule,
    CheckUpModalModule,
    ModalModule
  ]
})
export class InventoryModule { }
