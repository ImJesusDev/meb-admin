import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  title = 'Reparaciones';
  showAddBtn = true;

  constructor(public route: Router) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        if (event.url !== '/reparaciones') {
          this.showAddBtn = false;
        } else if (event.url === '/reparaciones') {
          this.title = 'Reparaciones';
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
