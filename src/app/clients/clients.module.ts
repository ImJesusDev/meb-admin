import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
/* Routing */
import { ClientsRoutingModule } from './clients-routing.module';
/* Components */
import { ClientsComponent } from './clients/clients.component';

@NgModule({
  declarations: [ClientsComponent],
  imports: [HttpClientModule, ClientsRoutingModule, CommonModule],
})
export class ClientsModule {}
