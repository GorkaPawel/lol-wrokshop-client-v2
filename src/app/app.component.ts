import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from './notification.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-root',
  template: `
    <app-error-modal
      class="error-modal"
      *ngIf="message"
      (closeModal)="close()">
      {{message}}
    </app-error-modal>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .error-modal {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10000;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private notificationService: NotificationService, private detector: ChangeDetectorRef) {
  }

  message = null;

  subs = new SubSink();

  close() {
    this.notificationService.errorMessages$.next(null);
  }


  ngOnInit() {
    this.subs.add(this.notificationService.errorMessages$.subscribe(message => {
        this.message = message;
        console.log(this.message);
        this.detector.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
