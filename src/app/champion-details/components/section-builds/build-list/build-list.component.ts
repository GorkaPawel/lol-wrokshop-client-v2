import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Build, UserChampion} from '../../../../API/DB/db.model';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck} from 'rxjs/operators';
import cloneDeep from 'lodash.clonedeep';
import {SubSink} from 'subsink';
@Component({
  selector: 'app-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.scss']
})
export class BuildListComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private router: Router, private detector: ChangeDetectorRef) {
  }

  subs = new SubSink();
  builds: Build[];
  page = 1;

  selectBuild(build: Build) {
    const buildClone = cloneDeep(build);
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['dashboard', 'champion', id, {outlets: {builds: 'edit'}}],
      {
        state: {
          build: buildClone,
        },
      });
  }

  navigate() {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['dashboard', 'champion', id, {outlets: {builds: 'edit'}}]);
  }

  ngOnInit() {
    this.subs.add(this.route.parent.data
      .pipe(pluck('champion', 'DbChamp'))
      .subscribe((champion: UserChampion) => {
          this.builds = champion.builds;
          this.detector.detectChanges();
      }));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
