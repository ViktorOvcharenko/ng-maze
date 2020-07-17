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
  @Input() modes: fromModels.IMode[];
  @Input() defaultLang: string;
  @Input() defaultMode: string;
  @Output() onSelectLanguage: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSelectMode: EventEmitter<string> = new EventEmitter<string>();

  public selectLanguage(value: string): void {
    this.onSelectLanguage.emit(value);
  }

  public selectMode(value: string): void {
    this.onSelectMode.emit(value);
  }
}
