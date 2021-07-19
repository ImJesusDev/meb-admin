import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.css']
})
export class BackArrowComponent implements OnInit {

  @Output() public onBack = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  back(): void {
    this.onBack.emit();
  }

}
