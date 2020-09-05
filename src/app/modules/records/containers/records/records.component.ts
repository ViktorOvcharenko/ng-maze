import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetRecords } from '../../../../core/store/actions/maze.actions';
import { Observable, Subscription } from 'rxjs';
import { getMode, getRecords } from '../../../../core/store/selectors/maze.selectors';

import * as fromModels from '../../../../core/models';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit, OnDestroy {
  public records$: Observable<fromModels.IRecord[]>;
  public recordsSub$: Subscription;
  public mode$: Observable<string>;
  public modeSub$: Subscription;
  public recordsSorted: fromModels.IRecord[];

  constructor(private store: Store) {
    this.mode$ = this.store.pipe(select(getMode));
    this.records$ = this.store.pipe(select(getRecords));
  }

  ngOnInit() {
    this.modeSub$ = this.mode$.subscribe(mode => {
      this.store.dispatch( new GetRecords(mode) );
    });
    this.recordsSub$ = this.records$.subscribe(records => {
      if (!records) {
        records = [];
      }
      this.recordsSorted = [...records].sort((a, b) => a.score - b.score);
    });
  }

  ngOnDestroy() {
    if (this.modeSub$) {
      this.modeSub$.unsubscribe();
    }

    if (this.recordsSub$) {
      this.recordsSub$.unsubscribe();
    }
  }
}
