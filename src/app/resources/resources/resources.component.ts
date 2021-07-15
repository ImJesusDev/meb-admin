import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
})
export class ResourcesComponent implements OnInit {
  title = 'Tipo de Recursos';
  showAddBtn = true;
  constructor(private route: Router) {
    // Workaround to show button to add clients
    // only in the clients list screen
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        if (event.url !== '/recursos') {
          this.showAddBtn = false;
        } else if (event.url === '/recursos') {
          this.title = 'Tipo de Recursos';
        }
      }
    });
  }

  ngOnInit(): void {}
}
