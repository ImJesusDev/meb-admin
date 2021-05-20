import { Component, OnInit, Input } from '@angular/core';

/* Models */
import { Client } from '../../models';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  /* Input list of clients */
  @Input() clients: Client[] | null = [] as Client[];

  constructor() {}

  ngOnInit(): void {}
}
