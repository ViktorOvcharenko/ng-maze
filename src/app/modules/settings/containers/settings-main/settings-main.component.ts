import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { select, Store } from "@ngrx/store";
import { SetLanguage } from "../../../../core/store/actions/account.actions";
import { SetMaze } from "../../../../core/store/actions/maze.actions";
import { Observable } from "rxjs";
import { getAccountLang } from "../../../../core/store/selectors/account.selector";
import { getMode } from "../../../../core/store/selectors/maze.selectors";

import * as fromModels from "../../../../core/models";
import {MazeGenerateService} from "../../../../core/services";

@Component({
  selector: 'app-settings-main-container',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.scss']
})
export class SettingsMainComponent {
  public languages: fromModels.ILanguage[] = [
    { value: 'en', viewValue: 'EN' },
    { value: 'ru', viewValue: 'RU' }
  ];
  public modes: fromModels.IMode[] = [
    { value: 'hard', viewValue: 'hard mode' },
    { value: 'medium', viewValue: 'medium mode' },
    { value: 'easy', viewValue: 'easy mode' }
  ];
  public defaultLang$: Observable<string>;
  public defaultMode$: Observable<string>;

  constructor(
    private translateService: TranslateService,
    private mazeService: MazeGenerateService,
    private store: Store
    )
  {
    this.defaultLang$ = this.store.pipe(select(getAccountLang));
    this.defaultMode$ = this.store.pipe(select(getMode));
  }

  public selectLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
    this.store.dispatch(new SetLanguage(lang));
  }

  public selectMode(mode: string): void {
    const maze = this.mazeService.generateMaze(mode);
    this.store.dispatch(new SetMaze(maze));
  }
}
