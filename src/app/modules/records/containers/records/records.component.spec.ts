import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RecordsComponent } from '../records/records.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { GetRecords } from '../../../../core/store/actions/maze.actions';
import { IRecord } from '../../../../core/models';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RecordsComponent', () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;
  let store: Store<any>;

  const firstRecord: IRecord = {
    score: 1,
    username: 'test',
    date: new Date(),
    mode: 'test'
  };

  const secondRecord: IRecord = {
    score: 1,
    username: 'test',
    date: new Date(),
    mode: 'test'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsComponent ],
      imports: [ TranslateModule.forRoot() ],
      providers: [
        provideMockStore({
          initialState: {
            maze: { levelMode: 'test' }
          }
        }),
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should call the GetRecords', () => {
      spyOn(store, 'dispatch');
      const action = new GetRecords('test');

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should call the addIndexRoRecords', () => {
      spyOn(component, 'addPositionToRecords');
      component.ngOnInit();

      expect(component.addPositionToRecords).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call next and complete from destroy$', () => {
      spyOn(component.destroy$, 'next');
      spyOn(component.destroy$, 'complete');

      component.ngOnDestroy();

      expect(component.destroy$.next).toHaveBeenCalled();
      expect(component.destroy$.complete).toHaveBeenCalled();
    });
  });

  describe('compareScores', () => {
    it('should return the positive number if first argument more then second one', () => {
      firstRecord.score = 2;
      secondRecord.score = 1;

      expect(component.compareScores(firstRecord, secondRecord)).toBeGreaterThan(0);
    });

    it('should return zero if arguments are equal', () => {
      firstRecord.score = 1;
      secondRecord.score = 1;

      expect(component.compareScores(firstRecord, secondRecord)).toBe(0);
    });

    it('should return the negative number if first argument less then second one', () => {
      firstRecord.score = 1;
      secondRecord.score = 2;

      expect(component.compareScores(firstRecord, secondRecord)).toBeLessThan(0);
    });
  });

  describe('addPositionToRecords', () => {
    it('should return records with position property', () => {
      const expected: IRecord[] = [
        { ...firstRecord, position: 1 },
        { ...secondRecord, position: 2 }
      ];

      expect(component.addPositionToRecords([firstRecord, secondRecord])).toEqual(expected);
    });
  });
});
