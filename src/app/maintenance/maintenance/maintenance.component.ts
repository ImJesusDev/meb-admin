import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  title = 'Mantenimientos';
  showAddBtn = true;

  constructor(public route: Router) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        if (event.url !== '/mantenimientos') {
          this.showAddBtn = false;
        } else if (event.url === '/mantenimientos') {
          this.title = 'Mantenimientos';
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
