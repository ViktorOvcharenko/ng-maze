import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsMainComponent } from './settings-main.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SettingsMainComponent', () => {
  let component: SettingsMainComponent;
  let fixture: ComponentFixture<SettingsMainComponent>;
  const result = 'test';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsMainComponent ],
      imports: [ TranslateModule.forRoot() ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('selectLanguage', () => {
    it('should emit onSelectLanguage', () => {
      spyOn(component.onSelectLanguage, 'emit');

      component.selectLanguage(result);

      expect(component.onSelectLanguage.emit).toHaveBeenCalledWith(result);
    });
  });

  describe('selectLevelMode', () => {
    it('should emit onSelectLanguage', () => {
      spyOn(component.onSelectLevelMode, 'emit');

      component.selectLevelMode(result);

      expect(component.onSelectLevelMode.emit).toHaveBeenCalledWith(result);
    });
  });

  describe('selectHeroMode', () => {
    it('should emit onSelectHeroMode', () => {
      spyOn(component.onSelectHeroMode, 'emit');

      component.selectHeroMode(result);

      expect(component.onSelectHeroMode.emit).toHaveBeenCalledWith(result);
    });
  });

  describe('selectWallMode', () => {
    it('should emit onSelectWallMode', () => {
      spyOn(component.onSelectWallMode, 'emit');

      component.selectWallMode(result);

      expect(component.onSelectWallMode.emit).toHaveBeenCalledWith(result);
    });
  });
});
