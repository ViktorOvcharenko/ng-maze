import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import { GetRecords } from '../../../../core/store/actions/maze.actions';
import {Observable, Subscription} from 'rxjs';
import {getMode} from '../../../../core/store/selectors/maze.selectors';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit, OnDestroy {
  public mode$: Observable<string>;
  public modeSub$: Subscription;

  constructor(private store: Store) {
    this.mode$ = this.store.pipe(select(getMode));
  }

  ngOnInit() {
    this.modeSub$ = this.mode$.subscribe(mode => {
      this.store.dispatch( new GetRecords(mode) );
    });
  }

  ngOnDestroy() {
    if (this.modeSub$) {
      this.modeSub$.unsubscribe();
    }
  }
}
