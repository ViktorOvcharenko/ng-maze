import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RecordsComponent } from '../records/records.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GetRecords } from '../../../../core/store/actions/maze.actions';
import { createRecordMock } from '../../../../core/test';

import * as fromModels from '../../../../core/models';


describe('RecordsComponent', () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;
  let store: MockStore<any>;
  const recordMock1: fromModels.IRecord = createRecordMock(1);
  const recordMock2: fromModels.IRecord = createRecordMock(2);
  const firstRecord: fromModels.IRecord = createRecordMock(1);
  const secondRecord: fromModels.IRecord = createRecordMock(2);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsComponent ],
      imports: [ TranslateModule.forRoot() ],
      providers: [
        provideMockStore({
          initialState: {
            maze: {
              levelMode: 'test',
              records: [recordMock2, recordMock1]
            }
          }
        }),
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should call the GetRecords', () => {
      const action = new GetRecords('test');
      spyOn(store, 'dispatch');

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should call the addIndexRoRecords', () => {
      spyOn(component, 'addPositionToRecords');

      component.ngOnInit();

      expect(component.addPositionToRecords).toHaveBeenCalled();
    });

    it('should be sorted records by index', () => {
      component.records$.subscribe(records => {
        expect(component.recordsSorted).toEqual([recordMock1, recordMock2]);
      });
    });

    it('should change the recordsSorted to empty array if records$ return null', () => {
      store.setState({
        maze: {
          levelMode: 'test',
          records: null
        }
      });
      component.records$.subscribe(records => {
        expect(component.recordsSorted).toEqual([]);
      });
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
      const expected: fromModels.IRecord[] = [
        { ...firstRecord, position: 1 },
        { ...secondRecord, position: 2 }
      ];

      expect(component.addPositionToRecords([firstRecord, secondRecord])).toEqual(expected);
    });
  });
});
