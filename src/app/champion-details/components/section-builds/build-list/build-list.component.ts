import {Component, OnInit} from '@angular/core';
import {Build, UserChampion} from '../../../../API/DB/db.model';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck} from 'rxjs/operators';

@Component({
  selector: 'app-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.scss']
})
export class BuildListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  builds: Build[];
  page = 1;

  selectBuild(build: Build) {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['dashboard', 'champion', id, {outlets: {builds: 'edit'}}],
      {
        state: {
          build,
        },
      });
  }

  ngOnInit() {
    this.route.parent.data
      .pipe(pluck('champion', 'DbChamp'))
      .subscribe((champion: UserChampion) => {
        if (champion) {
          this.builds = champion.builds;
        }
      });
  }
}
