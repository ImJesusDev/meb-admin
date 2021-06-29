import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-headernav',
  templateUrl: './headernav.component.html',
  styleUrls: ['./headernav.component.css'],
})
export class HeadernavComponent implements OnInit {
  fullName = '';
  photoUrl = '';
  dropDownOpen = false;
  @Output() logOut = new EventEmitter();

  constructor() {
    const fullName = localStorage.getItem('fullName');
    const photoUrl = localStorage.getItem('photoUrl');
    this.fullName = fullName ? fullName : '';
    this.photoUrl = photoUrl ? photoUrl : 'assets/img/preview.png';
  }

  signOut(): void {
    this.logOut.emit();
  }

  ngOnInit(): void {}
}
