import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ILanguage } from "../../../../core/models/ILanguage";

@Component({
  selector: 'app-settings-main',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.scss']
})
export class SettingsMainComponent  {
  @Input() languages: ILanguage[];
  @Input() defaultLang: string;
  @Output() onSelectLanguage: EventEmitter<string> = new EventEmitter<string>();

  public selectLanguage(value: any): void {
    this.onSelectLanguage.emit(value);
  }
}
