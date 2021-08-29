import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
/* Routing */
import { ClientsRoutingModule } from './clients-routing.module';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/* State */
import { reducers, effects } from './state';
import { ClientListComponent } from './client-list/client-list.component';

/* Shared components */
import { SharedModule } from '../shared/shared.module';
import { BackArrowModule } from '@atoms/back-arrow';

/* Components */
import { ClientsComponent } from './clients/clients.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { OfficeFormComponent } from './office-form/office-form.component';
import { OfficesListComponent } from './offices-list/offices-list.component';

@NgModule({
  declarations: [ClientsComponent, ClientListComponent, ClientFormComponent, OfficeFormComponent, OfficesListComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BackArrowModule,
    HttpClientModule,
    ClientsRoutingModule,
    CommonModule,
    StoreModule.forFeature('clients', reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class ClientsModule { }
