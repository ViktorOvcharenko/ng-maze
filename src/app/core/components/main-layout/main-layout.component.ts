import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetStorageMode } from '../../store/actions/maze.actions';
import { SetStorageLanguage } from '../../store/actions/account.actions';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{

  constructor(private store: Store) {}

  ngOnInit() {
    const storeMode = window.localStorage.getItem('mode');
    const storeLang = window.localStorage.getItem('language');
    storeMode ? this.store.dispatch(new SetStorageMode(storeMode)): null;
    storeLang ? this.store.dispatch(new SetStorageLanguage(storeLang)): null;
  }
}
