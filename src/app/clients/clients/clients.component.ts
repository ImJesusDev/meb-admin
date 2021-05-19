import { Component, OnInit } from '@angular/core';

/* Models */
import { Client } from '../../models';

/* Services */
import { ClientsService } from '../../services';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  constructor(private _clients: ClientsService) {}

  ngOnInit(): void {
    this._clients.getClients().subscribe((res: Client[]) => {
      console.log(res);
    });
  }
}
