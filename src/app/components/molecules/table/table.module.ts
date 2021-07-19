import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    TableComponent
  ],
  entryComponents: [TableComponent],
  exports: [TableComponent],
  imports: [
    CommonModule
  ]
})
export class TableModule { }
