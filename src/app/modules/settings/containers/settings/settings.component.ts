import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { SetLanguage } from '../../../../core/store/actions/account.actions';
import { ClearScore, SetMode, UpdateIsWinn } from '../../../../core/store/actions/maze.actions';
import { Observable } from 'rxjs';
import { getAccountLang } from '../../../../core/store/selectors/account.selector';
import { getMode } from '../../../../core/store/selectors/maze.selectors';

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
  public defaultLang$: Observable<string>;
  public defaultMode$: Observable<string>;

  constructor(
    private translateService: TranslateService,
    private mazeService: fromServices.MazeService,
    private store: Store
  )
  {
    this.defaultLang$ = this.store.pipe(select(getAccountLang));
    this.defaultMode$ = this.store.pipe(select(getMode));
  }

  public selectLanguage(lang: string): void {
    window.localStorage.setItem('language', lang);
    this.translateService.setDefaultLang(lang);
    this.store.dispatch(new SetLanguage(lang));
  }

  public selectMode(mode: string): void {
    window.localStorage.setItem('mode', mode);
    this.mazeService.maze = this.mazeService.generateMaze(mode);
    this.mazeService.refreshHeroLocation();
    this.store.dispatch(new SetMode(mode));
    this.store.dispatch(new ClearScore());
    this.store.dispatch(new UpdateIsWinn(false));
  }
}