import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesComponent } from './resources/resources.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesListComponent } from './resources-list/resources-list.component';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/* State */
import { reducers, effects } from './state';
import { ResourcesFormComponent } from './resources-form/resources-form.component';

/* Components */
import { TableModule } from '@molecules/table/table.module';
import { ContainerModule } from '@atoms/container/container.module';
import { BackArrowModule } from '@atoms/back-arrow';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ResourcesComponent,
    ResourcesListComponent,
    ResourcesFormComponent,
  ],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('resources', reducers),
    EffectsModule.forFeature(effects),
    TableModule,
    SharedModule,
    ContainerModule,
    BackArrowModule
  ],
})
export class ResourcesModule { }
