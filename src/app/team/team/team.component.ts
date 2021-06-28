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

  constructor(private route: Router) {
    // Workaround to show button to add clients
    // only in the clients list screen
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        if (event.url !== '/equipo') {
          this.showAddBtn = false;
        }
      }
    });
  }

  ngOnInit(): void {}
}
