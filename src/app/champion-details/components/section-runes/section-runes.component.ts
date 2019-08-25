import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RunesAdapterService} from './runes-adapter.service';
import {RunesStateService} from './runes-state.service';

@Component({
  selector: 'app-section-runes',
  template: `
    <button (click)="navigate('runes')">list</button>
    <button (click)="navigate(['runes', 'edit'])">edit</button>
    <router-outlet></router-outlet>
  `,
  providers: [RunesAdapterService, RunesStateService],
  styles: [``]
})
export class SectionRunesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private runesService: RunesAdapterService, private runeStore: RunesStateService) {
  }

  navigate(path: string | string[]) {
    const id = this.route.parent.snapshot.paramMap.get('id');
    this.router.navigate(['dashboard', 'champion', id, {outlets: {builds: path}}]);
  }
  ngOnInit() {
    this.runesService.storeRunes(this.route.snapshot.data['runes']);
    this.runeStore.runeStore$.subscribe((state) => {
      console.log('Store:', state);
    });
  }
}
