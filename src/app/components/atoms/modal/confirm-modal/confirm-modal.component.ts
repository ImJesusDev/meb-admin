import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {


  @Input() public showBackDrop: boolean;
  @Input() public showModal: boolean;
  @Input() public header: string;
  @Input() public question: string;
  @Output() public close = new EventEmitter();

  constructor() {

    this.showBackDrop = false;
    this.showModal = false;
    this.header = '';
    this.question = '';
  }

  ngOnInit(): void {
  }

  onClose(ok?: boolean): void {
    this.close.emit(ok);
  }

}
