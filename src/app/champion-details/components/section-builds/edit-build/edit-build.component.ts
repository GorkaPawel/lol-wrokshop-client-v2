import {Component, DoCheck, OnDestroy,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Build} from '../../../../API/DB/db.model';
import {DbService} from '../../../../API/DB/db.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-edit-build',
  templateUrl: './edit-build.component.html',
  styleUrls: ['./edit-build.component.scss']
})
export class EditBuildComponent implements DoCheck, OnDestroy {

  constructor(private router: Router, private db: DbService, private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.build = this.router.getCurrentNavigation().extras.state.build;
    }
  }
  subs = new SubSink();
  cantSave = true;
  build: Build = {
    buildName: '',
    items: Object.seal(new Array(6).fill(null)),
  };

  save() {
    if (this.cantSave) {
      return;
    }
    const id = this.route.parent.snapshot.paramMap.get('id');
    this.subs.add(this.db.updateBuild(this.build).subscribe(response => {
      this.route.snapshot.parent.parent.data.champion.DbChamp.builds = response;
      this.router.navigate(['dashboard', 'champion', id, {outlets: {builds: null}}]);
    }));
  }

  ngDoCheck() {
    const cantSave = this.build.items.some(item => {
      return !!item === false;
    });
    this.cantSave = cantSave || (!!this.build.buildName === false);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
