import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/* Models */
import { Checkup, ES_COMPONENT_STATUS } from './../../../../models/chekoups';

@Component({
  selector: 'app-check-up-modal',
  templateUrl: './check-up-modal.component.html',
  styleUrls: ['./check-up-modal.component.css']
})
export class CheckUpModalComponent implements OnInit {

  @Input() public showBackDrop: boolean;
  @Input() public showModal: boolean;
  @Input() public checkup: Checkup;
  @Output() public close = new EventEmitter();

  componentStatus = ES_COMPONENT_STATUS;

  constructor() {
    this.showBackDrop = false;
    this.showModal = false;
    this.checkup = {
      components: [],
      createdAt: '',
      id: '',
      resourceRef: '',
      status: ''
    };
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.close.emit();
  }
}
