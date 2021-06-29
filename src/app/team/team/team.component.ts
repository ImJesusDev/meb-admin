import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  /* Page title */
  title = 'Equipo';
  showAddBtn = true;
  showAdminBtn = false;

  constructor(private route: Router) {
    // Workaround to show button to add clients
    // only in the clients list screen
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAdminBtn = false;
        this.showAddBtn = true;
        this.title = 'Equipo';
        if (event.url !== '/equipo') {
          this.showAddBtn = false;
        }
        if (event.url.includes('/equipo/admin-clientes')) {
          this.showAdminBtn = true;
          this.title = 'Administradores Cliente';
        }
        if (event.url.includes('/equipo/admin-clientes/nuevo')) {
          this.showAdminBtn = false;
        }
      }
    });
  }

  ngOnInit(): void {}
}
