import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  /* Page title */
  title = 'Clientes';
  showAddBtn = true;

  constructor(private route: Router) {
    // Workaround to show button to add clients
    // only in the clients list screen
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        if (event.url !== '/clientes') {
          this.showAddBtn = false;
        }
      }
    });
  }

  ngOnInit(): void {}
}
