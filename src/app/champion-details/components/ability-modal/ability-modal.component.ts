import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-ability-modal',
  templateUrl: './ability-modal.component.html',
  styleUrls: ['./ability-modal.component.scss']
})
export class AbilityModalComponent {
  @Output() modalClose = new EventEmitter();

  closeModal() {
    this.modalClose.emit(null);
  }

  constructor() {
  }
}
