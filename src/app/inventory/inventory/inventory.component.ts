import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  title = 'Inventario';
  showAddBtn = true;

  constructor(private route: Router) {
    // Workaround to show button to add clients
    // only in the clients list screen
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        if (event.url !== '/inventario') {
          this.showAddBtn = false;
        } else if (event.url === '/inventario') {
          this.title = 'Inventario';
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
