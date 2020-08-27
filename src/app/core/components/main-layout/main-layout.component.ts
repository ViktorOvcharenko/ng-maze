import { Component, OnInit } from '@angular/core';
import { SetStorageMode } from '../../store/actions/maze.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{

  constructor(private store: Store) {}

  ngOnInit() {
    const storeMode = window.localStorage.getItem('mode');
    this.store.dispatch(new SetStorageMode(storeMode));
  }
}
