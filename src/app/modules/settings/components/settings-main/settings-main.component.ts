import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import * as fromModels from "../../../../core/models";

@Component({
  selector: 'app-settings-main',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsMainComponent  {
  @Input() languages: fromModels.ILanguage[];
  @Input() levels: fromModels.IMode[];
  @Input() heroes: fromModels.IMode[];
  @Input() walls: fromModels.IMode[];
  @Input() defaultLang: string;
  @Input() defaultLevelMode: string;
  @Input() defaultHeroMode: string;
  @Input() defaultWallMode: string;
  @Output() onSelectLanguage: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSelectLevelMode: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSelectHeroMode: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSelectWallMode: EventEmitter<string> = new EventEmitter<string>();

  public selectLanguage(value: string): void {
    this.onSelectLanguage.emit(value);
  }

  public selectLevelMode(levelMode: string): void {
    this.onSelectLevelMode.emit(levelMode);
  }

  public selectHeroMode(heroMode: string): void {
    this.onSelectHeroMode.emit(heroMode);
  }

  public selectWallMode(wallMode: string): void {
    this.onSelectWallMode.emit(wallMode);
  }
}
