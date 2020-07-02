import { Component } from '@angular/core';
import { ILanguage } from "../../../../core/models/ILanguage";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-settings-main-container',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.scss']
})
export class SettingsMainComponent {
  public languages: ILanguage[] = [
    { value: 'en', viewValue: 'EN' },
    { value: 'ru', viewValue: 'RU' },
  ];
  public defaultLang = this.languages[0].value;

  constructor(private translateService: TranslateService) {}

  public onSelectLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }
}
