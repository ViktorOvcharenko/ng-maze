import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MazeCeilComponent } from './maze-ceil.component';

describe('MazeCeilComponent', () => {
  let component: MazeCeilComponent;
  let fixture: ComponentFixture<MazeCeilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MazeCeilComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeCeilComponent);
    component = fixture.componentInstance;
    component.heroMode = 'test';
    component.wallMode = 'test';
    fixture.detectChanges();
  });

  describe('wallStyleClassName', () => {
    it('should return sliced wallMode', () => {
      expect(component.wallStyleClassName).toBe(component.wallMode.slice(9));
    });
  });

  describe('heroStyleClassName', () => {
    it('should return sliced heroMode', () => {
      expect(component.heroStyleClassName).toBe(component.heroMode.slice(9));
    });
  });
});
