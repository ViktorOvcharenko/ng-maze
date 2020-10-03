import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsWallModeComponent } from './settings-wall-mode.component';
import {TranslateModule} from '@ngx-translate/core';

describe('SettingsWallModeComponent', () => {
  let component: SettingsWallModeComponent;
  let fixture: ComponentFixture<SettingsWallModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsWallModeComponent ],
      imports: [ TranslateModule.forRoot() ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsWallModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('selectHeroMode', () => {
    it('should emit onSelectHeroMode', () => {
      spyOn(component.onSelectWallMode, 'emit');
      const result = 'test';

      component.selectWallMode(result);

      expect(component.onSelectWallMode.emit).toHaveBeenCalledWith(result);
    });
  });
});
