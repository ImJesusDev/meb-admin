import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Guards */
import { AuthGuard } from '../guards/auth.guard';

/* Components */
import { CheckUpsComponent } from './check-ups/check-ups.component';
import { CheckUpsHistoryComponent } from './check-ups-history/check-ups-history.component';
import { CheckUpsPendingComponent } from './check-ups-pending/check-ups-pending.component';

const routes: Routes = [
  {
    path: 'check-ups',
    component: CheckUpsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CheckUpsPendingComponent },
      { path: 'historial', component: CheckUpsHistoryComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckUpsRoutingModule { }
