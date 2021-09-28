import { BookingListComponent } from './booking-list/booking-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Guards */
import { AuthGuard } from '../guards/auth.guard';

/* Components */
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {
    path: 'reservas',
    component: BookingComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: BookingListComponent }
    ],
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
