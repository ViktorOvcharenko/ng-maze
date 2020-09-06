import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { SetLanguage } from '../../../../core/store/actions/account.actions';
import { ClearScore, SetHeroMode, SetLevelMode, UpdateIsWinn } from '../../../../core/store/actions/maze.actions';
import { Observable } from 'rxjs';
import { getAccountLang } from '../../../../core/store/selectors/account.selector';
import { getHeroMode, getLevelMode } from '../../../../core/store/selectors/maze.selectors';

import * as fromModels from '../../../../core/models';
import * as fromConstants from '../../../../core/constants';
import * as fromServices from '../../../../core/services';

@Component({
  selector: 'app-settings-container',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public languages: fromModels.ILanguage[] = fromConstants.LANGUAGES;
  public modes: fromModels.IMode[] = fromConstants.MODES;
  public heroes: fromModels.IMode[] = fromConstants.HEROES;
  public defaultLang$: Observable<string>;
  public defaultMode$: Observable<string>;
  public defaultHero$: Observable<string>;

  constructor(
    private translateService: TranslateService,
    private mazeService: fromServices.MazeService,
    private store: Store
  )
  {
    this.defaultLang$ = this.store.pipe(select(getAccountLang));
    this.defaultMode$ = this.store.pipe(select(getLevelMode));
    this.defaultHero$ = this.store.pipe(select(getHeroMode));
  }

  public selectLanguage(lang: string): void {
    localStorage.setItem('language', lang);
    this.translateService.setDefaultLang(lang);
    this.store.dispatch(new SetLanguage(lang));
  }

  public selectMode(mode: string): void {
    localStorage.setItem('level-mode', mode);
    this.mazeService.maze = this.mazeService.generateMaze(mode);
    this.mazeService.refreshHeroLocation();
    this.store.dispatch(new SetLevelMode(mode));
    this.store.dispatch(new ClearScore());
    this.store.dispatch(new UpdateIsWinn(false));
  }

  public selectHero(hero: string): void {
    localStorage.setItem('hero-mode', hero);
    this.store.dispatch(new SetHeroMode(hero));
  }
}
