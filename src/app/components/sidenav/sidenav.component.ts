import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  isOpen = false;
  userRole:string | null;
  constructor() {
    this.userRole = localStorage.getItem('role');
    console.log(this.userRole);
  }

  ngOnInit(): void {
    
  }

  toggleSideBar(): void {
    this.isOpen = !this.isOpen;
  }
}
