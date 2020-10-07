import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import * as fromModels from "../../../../core/models"

@Component({
  selector: 'app-settings-language',
  templateUrl: './settings-language.component.html',
  styleUrls: ['./settings-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsLanguageComponent {
  @Input() languages: fromModels.ILanguage[];
  @Input() defaultLang: string;
  @Output() onSelectLanguage: EventEmitter<string> = new EventEmitter<string>();

  selectLanguage(value: string): void {
    this.onSelectLanguage.emit(value);
  }
}
