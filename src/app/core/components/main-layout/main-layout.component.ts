import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetLevelModeFromStorage, SetHeroModeFromStorage } from '../../store/actions/maze.actions';
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
    const storeMode = window.localStorage.getItem('level-mode');
    const storeLang = window.localStorage.getItem('language');
    const storeHero = window.localStorage.getItem('hero-mode');
    if (storeMode) {
      this.store.dispatch( new SetLevelModeFromStorage(storeMode) );
    }
    if (storeMode) {
      this.store.dispatch( new SetLanguageFromStorage(storeLang) );
      this.translateService.setDefaultLang(storeLang);
    }
    if (storeHero) {
      this.store.dispatch( new SetHeroModeFromStorage(storeHero) );
    }
  }
}
