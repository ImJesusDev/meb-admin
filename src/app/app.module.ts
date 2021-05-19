import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
/* Routing */
import { AppRoutingModule } from './app-routing.module';
/* Components */
import { AppComponent } from './app.component';
/* Environment */
import { environment } from '../environments/environment';
/* NgRx Store */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
/* NgRx effects */
import { EffectsModule } from '@ngrx/effects';
/* Reducers */
import { reducer } from './state/loader/loader.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
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
