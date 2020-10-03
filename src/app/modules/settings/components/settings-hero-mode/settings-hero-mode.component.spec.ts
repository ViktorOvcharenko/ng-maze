import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsHeroModeComponent } from './settings-hero-mode.component';
import {TranslateModule} from '@ngx-translate/core';

describe('SettingsHeroModeComponent', () => {
  let component: SettingsHeroModeComponent;
  let fixture: ComponentFixture<SettingsHeroModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsHeroModeComponent ],
      imports: [ TranslateModule.forRoot() ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsHeroModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('selectHeroMode', () => {
    it('should emit onSelectHeroMode', () => {
      spyOn(component.onSelectHeroMode, 'emit');
      const result = 'test';

      component.selectHeroMode(result);

      expect(component.onSelectHeroMode.emit).toHaveBeenCalledWith(result);
    });
  });
});
