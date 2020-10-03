import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsLevelModeComponent } from './settings-level-mode.component';
import {TranslateModule} from '@ngx-translate/core';

describe('SettingsLevelModeComponent', () => {
  let component: SettingsLevelModeComponent;
  let fixture: ComponentFixture<SettingsLevelModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLevelModeComponent ],
      imports: [ TranslateModule.forRoot() ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLevelModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('selectHeroMode', () => {
    it('should emit onSelectHeroMode', () => {
      spyOn(component.onSelectLevelMode, 'emit');
      const result = 'test';

      component.selectLevelMode(result);

      expect(component.onSelectLevelMode.emit).toHaveBeenCalledWith(result);
    });
  });
});
