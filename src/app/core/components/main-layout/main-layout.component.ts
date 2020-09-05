import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetModeFromStorage, SetHeroFromStorage } from '../../store/actions/maze.actions';
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
    const storeMode = window.localStorage.getItem('mode');
    const storeLang = window.localStorage.getItem('language');
    const storeHero = window.localStorage.getItem('hero');
    if (storeMode) {
      this.store.dispatch( new SetModeFromStorage(storeMode) );
    }
    if (storeMode) {
      this.store.dispatch( new SetLanguageFromStorage(storeLang) );
      this.translateService.setDefaultLang(storeLang);
    }
    if (storeHero) {
      this.store.dispatch( new SetHeroFromStorage(storeHero) );
    }
  }
}
