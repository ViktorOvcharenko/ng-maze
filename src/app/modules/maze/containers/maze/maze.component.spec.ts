import {NgZone, NO_ERRORS_SCHEMA} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MazeComponent } from './maze.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import { MazeService } from '../../../../core/services';
import { MazeServiceMock, TranslateServiceMock } from '../../../../core/test/services';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {IRecord} from '../../../../core/models';

describe('MazeComponent', () => {
  let component: MazeComponent;
  let fixture: ComponentFixture<MazeComponent>;
  let mazeService: MazeService;
  let store: MockStore;
  let snackBar: MatSnackBar;
  let translateService: TranslateService;
  let ngZone: NgZone;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MazeComponent ],
      imports: [ MatSnackBarModule ],
      providers: [
        provideMockStore({
          initialState: {
            account : { userName: 'test' },
            maze: {
              levelMode: 'test',
              heroMode: 'test',
              wallMode: 'test',
              isWin: false,
              score: 0,
              records: []
            }
          }
        }),
        { provide: MazeService, useClass: MazeServiceMock },
        { provide: TranslateService, useClass: TranslateServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
    mazeService = TestBed.inject(MazeService);
    store = TestBed.inject(MockStore);
    snackBar = TestBed.inject(MatSnackBar);
    translateService = TestBed.inject(TranslateService);
    ngZone = TestBed.inject(NgZone);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
