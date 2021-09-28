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
import { reducer as loaderReducer } from './state/loader/loader.reducer';
import { reducer as authReducer } from './state/auth/auth.reducer';
import { reducer as usersReducer } from './state/users/user.reducer';
import { reducer as locationsReducer } from './state/locations/locations.reducer';

/* Components */
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeadernavComponent } from './components/headernav/headernav.component';

/* Modules */
import { ClientsModule } from './clients/clients.module';
import { SharedModule } from './shared/shared.module';
import { TeamModule } from './team/team.module';
import { ResourcesModule } from './resources/resources.module';
import { InventoryModule } from './inventory/inventory.module';
import { CheckUpsModule } from './check-ups/check-ups.module';
/* Effects */
import { effects } from './state/state';
/* Guards */
import { AuthGuard } from './guards/auth.guard';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { ApprovalsModule } from './approvals/approvals.module';
import { RepairModule } from './repair/repair.module';
import { BookingModule } from './booking/booking.module';
@NgModule({
  declarations: [AppComponent, SidenavComponent, HeadernavComponent],
  imports: [
    ClientsModule,
    TeamModule,
    ResourcesModule,
    SharedModule,
    InventoryModule,
    CheckUpsModule,
    MaintenanceModule,
    ApprovalsModule,
    RepairModule,
    BookingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      loader: loaderReducer,
      auth: authReducer,
      users: usersReducer,
      locations: locationsReducer,
    }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      name: 'MEB Admin',
      logOnly: environment.production,
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
