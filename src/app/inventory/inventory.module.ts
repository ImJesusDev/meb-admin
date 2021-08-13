import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/* General Components */
import { ContainerModule } from '@atoms/container/container.module';
import { SharedModule } from '@shared/shared.module';
import { BackArrowModule } from '@atoms/back-arrow';

/* State */
import { reducers, effects } from './state';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { DocumentsComponent } from './documents/documents.component';


@NgModule({
  declarations: [
    InventoryComponent,
    InventoryListComponent,
    InventoryFormComponent,
    DocumentsComponent
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
    BackArrowModule
  ]
})
export class InventoryModule { }
