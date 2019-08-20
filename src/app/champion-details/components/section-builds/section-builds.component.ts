import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OnInit} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-section-builds',
  template: `
    <button (click)="navigate('edit')">add build</button>
    <button (click)="navigate(null)">list</button>
    <router-outlet></router-outlet>
  `,
  styles: [`
    button {
      display: block;
      padding: 15px;
      border: 1px solid orange;
      background-color: transparent;
      color: white;
      width: 100px;
      font-size: .7rem;
      font-weight: bold;
      text-decoration: none;
    }

    a:hover {
      color: darkred;
    }
  `]
})
export class SectionBuildsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {
  }
  navigate(path: string) {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['dashboard', 'champion', id, {outlets: {builds: path}}], {
      queryParamsHandling: 'preserve'
    });
  }

  ngOnInit(): void {

  }
}

