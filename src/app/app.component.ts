import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from './notification.service';
import {SubSink} from 'subsink';
import {NavigationEnd, Router, RouterEvent, Scroll} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <app-error-modal
      class="error-modal"
      *ngIf="message"
      (closeModal)="close()">
      {{message}}
    </app-error-modal>
    <app-spinner *ngIf="spin$ | async"></app-spinner>
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
  constructor(private notificationService: NotificationService, private detector: ChangeDetectorRef, private router: Router) {
    this.spin$ = this.router.events.pipe(
      map((event: RouterEvent) => {
        if (event instanceof NavigationEnd || event instanceof Scroll) {
          return false;
        }
        return true;
      })
    );
  }

  spin$: Observable<boolean>;
  message = null;

  subs = new SubSink();

  close() {
    this.notificationService.errorMessages$.next(null);
  }


  ngOnInit() {
    this.subs.add(this.notificationService.errorMessages$.subscribe(message => {
        this.message = message;
        this.detector.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
