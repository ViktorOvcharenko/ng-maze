import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { SetLanguage } from '../../../../core/store/actions/account.actions';
import {
  ClearScore,
  SetHeroMode,
  SetLevelMode,
  SetWallMode,
  UpdateIsWin
} from '../../../../core/store/actions/maze.actions';
import { Observable } from 'rxjs';
import { getAccountLang } from '../../../../core/store/selectors/account.selectors';
import { getHeroMode, getLevelMode, getWallMode } from '../../../../core/store/selectors/maze.selectors';

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
  public levels: fromModels.IMode[] = fromConstants.LEVELS;
  public heroes: fromModels.IMode[] = fromConstants.HEROES;
  public walls: fromModels.IMode[] = fromConstants.WALLS;
  public defaultLang$: Observable<string>;
  public defaultLevelMode$: Observable<string>;
  public defaultHeroMode$: Observable<string>;
  public defaultWallMode$: Observable<string>;

  constructor(
    private translateService: TranslateService,
    private mazeService: fromServices.MazeService,
    private store: Store
  )
  {
    this.defaultLang$ = this.store.pipe(select(getAccountLang));
    this.defaultLevelMode$ = this.store.pipe(select(getLevelMode));
    this.defaultHeroMode$ = this.store.pipe(select(getHeroMode));
    this.defaultWallMode$ = this.store.pipe(select(getWallMode));
  }

  public selectLanguage(lang: string): void {
    localStorage.setItem('language', lang);
    this.translateService.setDefaultLang(lang);
    this.store.dispatch(new SetLanguage(lang));
  }

  public selectLevelMode(levelMode: string): void {
    localStorage.setItem('level-mode', levelMode);
    this.mazeService.maze = this.mazeService.generateMaze(levelMode);
    this.mazeService.refreshHeroLocation();
    this.store.dispatch(new SetLevelMode(levelMode));
    this.store.dispatch(new ClearScore());
    this.store.dispatch(new UpdateIsWin(false));
  }

  public selectHeroMode(heroMode: string): void {
    localStorage.setItem('hero-mode', heroMode);
    this.store.dispatch(new SetHeroMode(heroMode));
  }

  public selectWallMode(wallMode: string): void {
    localStorage.setItem('wall-mode', wallMode);
    this.store.dispatch(new SetWallMode(wallMode));
  }
}
