import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SetLevelModeFromStorage,
  SetHeroModeFromStorage,
  SetWallModeFromStorage
} from '../../store/actions/maze.actions';
import { SetLanguageFromStorage } from '../../store/actions/account.actions';
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
    const storeLevelMode = localStorage.getItem('level-mode');
    const storeLang = localStorage.getItem('language');
    const storeHeroMode = localStorage.getItem('hero-mode');
    const storeWallMode = localStorage.getItem('wall-mode');

    if (storeLevelMode) {
      this.store.dispatch( new SetLevelModeFromStorage(storeLevelMode) );
    }
    if (storeLang) {
      this.store.dispatch( new SetLanguageFromStorage(storeLang) );
      this.translateService.setDefaultLang(storeLang);
    }
    if (storeHeroMode) {
      this.store.dispatch( new SetHeroModeFromStorage(storeHeroMode) );
    }
    if (storeWallMode) {
      this.store.dispatch( new SetWallModeFromStorage(storeWallMode) );
    }
  }
}
