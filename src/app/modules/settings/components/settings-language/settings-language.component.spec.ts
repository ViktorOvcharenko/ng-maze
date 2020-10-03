import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsLanguageComponent } from './settings-language.component';
import {TranslateModule} from '@ngx-translate/core';

describe('SettingsLanguageComponent', () => {
  let component: SettingsLanguageComponent;
  let fixture: ComponentFixture<SettingsLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLanguageComponent ],
      imports: [ TranslateModule.forRoot() ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('selectHeroMode', () => {
    it('should emit onSelectHeroMode', () => {
      spyOn(component.onSelectLanguage, 'emit');
      const result = 'test';

      component.selectLanguage(result);

      expect(component.onSelectLanguage.emit).toHaveBeenCalledWith(result);
    });
  });
});
