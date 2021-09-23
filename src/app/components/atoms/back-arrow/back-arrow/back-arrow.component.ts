import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.css']
})
export class BackArrowComponent implements OnInit {

  @Input() public backRoute: string;
  @Output() public onBack = new EventEmitter();

  constructor(private router: Router) {
    this.backRoute = '';
  }

  ngOnInit(): void {
  }

  back(): void {
    if (this.backRoute) {
      history.back();
      // this.router.navigate([this.backRoute]);
    } else {
      this.onBack.emit();
    }
  }

}
