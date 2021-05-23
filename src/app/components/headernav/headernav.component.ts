import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-headernav',
  templateUrl: './headernav.component.html',
  styleUrls: ['./headernav.component.css'],
})
export class HeadernavComponent implements OnInit {
  fullName = '';
  dropDownOpen = false;
  @Output() logOut = new EventEmitter();

  constructor() {
    const fullName = localStorage.getItem('fullName');
    this.fullName = fullName ? fullName : '';
  }

  signOut(): void {
    this.logOut.emit();
  }

  ngOnInit(): void {}
}
