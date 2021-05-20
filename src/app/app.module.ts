import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
/* Routing */
import { AppRoutingModule } from './app-routing.module';
/* Environment */
import { environment } from '../environments/environment';
/* NgRx Store */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
/* NgRx effects */
import { EffectsModule } from '@ngrx/effects';
/* Reducers */
import { reducer } from './state/loader/loader.reducer';

/* Components */
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeadernavComponent } from './components/headernav/headernav.component';

/* Modules */
import { ClientsModule } from './clients/clients.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, SidenavComponent, HeadernavComponent],
  imports: [
    ClientsModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ loader: reducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'MEB Admin',
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
