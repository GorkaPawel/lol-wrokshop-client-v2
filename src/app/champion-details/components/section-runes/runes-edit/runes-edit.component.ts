import {Component, OnInit} from '@angular/core';
import {RunesAdapterService} from '../runes-adapter.service';
import {RunePath} from '../runes.model';

@Component({
  selector: 'app-runes-edit',
  templateUrl: './runes-edit.component.html',
  styleUrls: ['./runes-edit.component.scss']
})
export class RunesEditComponent implements OnInit {

  constructor(private runesAdapter: RunesAdapterService) {
  }

  saveRunePage() {

  }


  ngOnInit() {
  }
}
