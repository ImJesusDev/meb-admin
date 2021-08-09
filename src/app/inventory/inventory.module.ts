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

/* State */
import { reducers, effects } from './state';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';


@NgModule({
  declarations: [
    InventoryComponent,
    InventoryListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InventoryRoutingModule,
    StoreModule.forFeature('resources', reducers),
    EffectsModule.forFeature(effects),
    ContainerModule,
    SharedModule
  ]
})
export class InventoryModule { }
