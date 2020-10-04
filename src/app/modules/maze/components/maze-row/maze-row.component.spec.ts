import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MazeRowComponent } from './maze-row.component';

describe('MazeRowComponent', () => {
  let component: MazeRowComponent;
  let fixture: ComponentFixture<MazeRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MazeRowComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
