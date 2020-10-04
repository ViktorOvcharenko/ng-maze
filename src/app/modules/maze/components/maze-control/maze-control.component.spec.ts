import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MazeControlComponent } from './maze-control.component';

describe('MazeControlComponent', () => {
  let component: MazeControlComponent;
  let fixture: ComponentFixture<MazeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MazeControlComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('refreshMaze', () => {
    it('should emit onRefreshMaze', () => {
      spyOn(component.onRefreshMaze, 'emit');

      component.refreshMaze();

      expect(component.onRefreshMaze.emit).toHaveBeenCalled();
    });
  });

  describe('heroStep', () => {
    it('should emit onHeroStep if win is false', () => {
      spyOn(component.onHeroStep, 'emit');
      component.win = false;

      component.heroStep('test');

      expect(component.onHeroStep.emit).toHaveBeenCalled();
    });

    it(`should doesn't emit onHeroStep if win is true`, () => {
      spyOn(component.onHeroStep, 'emit');
      component.win = true;

      component.heroStep('test');

      expect(component.onHeroStep.emit).toHaveBeenCalledTimes(0);
    });
  });

  describe('heroStepFromKeyboard', () => {
    it('should emit onHeroStep if win is false', () => {
      spyOn(component.onHeroStep, 'emit');
      component.win = false;
      const keyEvent = new KeyboardEvent('keydown');

      component.heroStepFromKeyboard(keyEvent);

      expect(component.onHeroStep.emit).toHaveBeenCalled();
    });

    it(`should doesn't emit onHeroStep if win is true`, () => {
      spyOn(component.onHeroStep, 'emit');
      component.win = true;
      const keyEvent = new KeyboardEvent('keydown');

      component.heroStepFromKeyboard(keyEvent);

      expect(component.onHeroStep.emit).toHaveBeenCalledTimes(0);
    });
  });
});
