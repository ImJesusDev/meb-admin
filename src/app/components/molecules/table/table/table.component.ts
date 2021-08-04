import { Component, Input, OnInit } from '@angular/core';
/* rxjs */
import { Observable, of } from 'rxjs';

export type columnType = 'text' | 'image' | 'edit' | 'delete' | 'extra' | 'boolean';

export interface Column {
  name: string;
  type: columnType;
  onClick?: Function;
  onClickPlus?: Function;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() public data$: Observable<any[]> = of([] as any[]);
  @Input() public columns: Column[] = new Array();
  @Input() public headers: string[] = new Array();

  public columnTypes = { text: 'text', image: 'image', edit: 'edit', delete: 'delete', extra: 'extra', boolean: 'boolean' };

  constructor() { }

  ngOnInit(): void {
  }

  onClickPlus(clickPlus: Function | undefined): void {
    if (clickPlus) {
      clickPlus();
    }
  }
}
