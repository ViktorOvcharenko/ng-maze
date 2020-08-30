import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetStorageMode } from '../../store/actions/maze.actions';
import { SetStorageLanguage } from '../../store/actions/account.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{

  constructor(
    private store: Store,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    const storeMode = window.localStorage.getItem('mode');
    const storeLang = window.localStorage.getItem('language');
    if (storeMode) {
      this.store.dispatch( new SetStorageMode(storeMode) );
    }
    if (storeMode) {
      this.store.dispatch( new SetStorageLanguage(storeLang) );
      this.translateService.setDefaultLang(storeLang);
    }
  }
}
