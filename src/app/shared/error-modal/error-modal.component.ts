import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  constructor() {
  }

  @Output()
  closeModal = new EventEmitter();

  close() {
    this.closeModal.emit(null);
  }

  ngOnInit() {
  }

}
