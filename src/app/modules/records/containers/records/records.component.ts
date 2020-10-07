import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetRecords } from '../../../../core/store/actions/maze.actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getLevelMode, getRecords } from '../../../../core/store/selectors/maze.selectors';

import * as fromModels from '../../../../core/models';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit, OnDestroy {
  records$: Observable<fromModels.IRecord[]>;
  levelMode$: Observable<string>;
  recordsSorted: fromModels.IRecord[];
  recordsSortedWithIndex: fromModels.IRecord[];
  destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store) {
    this.levelMode$ = this.store.pipe(select(getLevelMode));
    this.records$ = this.store.pipe(select(getRecords));
  }

  ngOnInit() {
    this.levelMode$
      .pipe( takeUntil(this.destroy$) )
      .subscribe(mode => {
      this.store.dispatch( new GetRecords(mode) );
    });
    this.records$
      .pipe( takeUntil(this.destroy$) )
      .subscribe(records => {
      if (!records) {
        records = [];
      }
      this.recordsSorted = [...records].sort(this.compareScores);
      this.recordsSortedWithIndex = this.addPositionToRecords(this.recordsSorted);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  compareScores(a: fromModels.IRecord, b: fromModels.IRecord): number {
    return a.score - b.score;
  }

  addPositionToRecords(records: fromModels.IRecord[]): fromModels.IRecord[] {
    return records.map((record, index) => {
      return { ...record, position: index + 1 };
    });
  }
}
