import { Component } from '@angular/core';
import { ILanguage } from "../../../../core/models/ILanguage";
import { TranslateService } from "@ngx-translate/core";
import  {select, Store } from "@ngrx/store";
import { SetLanguage } from "../../../../core/store/actions/account.actions";
import { Observable } from "rxjs";
import { selectAccountLang } from "../../../../core/store/selectors/account.selector";

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
  public defaultLang$: Observable<string>;

  constructor(
    private translateService: TranslateService,
    private store: Store
    )
  {
    this.defaultLang$ = this.store.pipe(select(selectAccountLang))
  }

  public onSelectLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
    this.store.dispatch(new SetLanguage(lang));
  }
}
