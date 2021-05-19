import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
/* Routing */
import { ClientsRoutingModule } from './clients-routing.module';
/* Components */
import { ClientsComponent } from './clients/clients.component';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/* State */
import { reducers, effects } from './state';
@NgModule({
  declarations: [ClientsComponent],
  imports: [
    HttpClientModule,
    ClientsRoutingModule,
    CommonModule,
    StoreModule.forFeature('clients', reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class ClientsModule {}
