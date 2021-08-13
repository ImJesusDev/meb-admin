import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Guards */
import { AuthGuard } from '../guards/auth.guard';

/* Components */
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { DocumentsComponent } from './documents/documents.component';


const routes: Routes = [
  {
    path: 'inventario',
    component: InventoryComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: InventoryListComponent },
      { path: 'nuevo-recurso', component: InventoryFormComponent },
      { path: ':inventoryId/documents', component: DocumentsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
