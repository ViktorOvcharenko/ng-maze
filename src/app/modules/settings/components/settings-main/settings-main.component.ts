import { Component } from '@angular/core';

import { ILanguage } from "../../../../core/models/ILanguage";

@Component({
  selector: 'app-settings-main',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.scss']
})
export class SettingsMainComponent  {
  languages: ILanguage[] = [
    { value: 'en', viewValue: 'EN' },
    { value: 'ru', viewValue: 'RU' },
  ]

  currentLang = 'steak-0';

  x(value: any) {
    console.log(value)
  }
}
