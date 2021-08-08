import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() public showBackDrop: boolean;
  @Input() public showModal: boolean;

  @ViewChild("content") content?: ElementRef;

  constructor() {
    this.showBackDrop = false;
    this.showModal = false;
  }

}
