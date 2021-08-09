import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Guards */
import { AuthGuard } from '../guards/auth.guard';

/* Components */
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';


const routes: Routes = [
  {
    path: 'inventario',
    component: InventoryComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: InventoryListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
