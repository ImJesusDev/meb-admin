import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-check-ups',
  templateUrl: './check-ups.component.html',
  styleUrls: ['./check-ups.component.css']
})
export class CheckUpsComponent implements OnInit {

  title = 'Chequeos';
  showAddBtn = true;

  constructor(public route: Router) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        if (event.url !== '/check-ups') {
          this.showAddBtn = false;
        } else if (event.url === '/check-ups') {
          this.title = 'Chequeos';
        }
      }
    });
  }

  ngOnInit(): void {
  }

}