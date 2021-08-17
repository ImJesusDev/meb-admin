import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {

  title = 'Aprovaciones';
  showAddBtn = true;

  constructor(public route: Router) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        if (event.url !== '/aprovaciones') {
          this.showAddBtn = false;
        } else if (event.url === '/aprovaciones') {
          this.title = 'Aprovaciones';
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
