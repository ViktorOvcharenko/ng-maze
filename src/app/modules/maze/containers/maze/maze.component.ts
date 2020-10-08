import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AddRecord,
  ClearScore,
  GetRecords,
  ScoreTick,
  UpdateIsWin
} from '../../../../core/store/actions/maze.actions';
import { combineLatest, interval, Observable, Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  getLevelMode,
  getWin,
  getScore,
  getRecords,
  getHeroMode,
  getWallMode
} from '../../../../core/store/selectors/maze.selectors';
import { getUserName } from '../../../../core/store/selectors/account.selectors';

import * as _ from 'lodash';
import * as fromModels from '../../../../core/models';
import * as fromServices from '../../../../core/services';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit, OnDestroy {
  maze: fromModels.IMaze;
  levelMode$: Observable<string>;
  heroMode$: Observable<string>;
  wallMode$: Observable<string>;
  win$: Observable<boolean>;
  score$: Observable<number>;
  userName$: Observable<string>;
  records$: Observable<fromModels.IRecord[]>;
  debounceFlag = true;
  orientationFlag: boolean;
  recordThreshold: number;
  scoreTickSub$: Subscription;
  recordSub$: Subscription;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private mazeService: fromServices.MazeService,
    private store: Store,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    this.levelMode$ = this.store.pipe(select(getLevelMode));
    this.heroMode$ = this.store.pipe(select(getHeroMode));
    this.wallMode$ = this.store.pipe(select(getWallMode));
    this.win$ = this.store.pipe(select(getWin));
    this.score$ = this.store.pipe(select(getScore));
    this.userName$ = this.store.pipe(select(getUserName));
    this.records$ = this.store.pipe(select(getRecords));
  }

  ngOnInit(): void {
    this.levelMode$
      .pipe( takeUntil(this.destroy$) )
      .subscribe(mode => {
        this.maze = this.mazeService.generateMaze(mode);
        this.store.dispatch( new GetRecords(mode) );
      });
    this.refreshMaze();
    interval(50)
      .pipe( takeUntil(this.destroy$) )
      .subscribe(() => this.debounceFlag = true);
    this.records$
      .pipe( takeUntil(this.destroy$) )
      .subscribe(records => {
        if (records && records.length) {
          this.recordThreshold = records[records.length - 1].score;
        }
      });
    this.orientationFlag = screen.orientation.type === 'portrait-primary' && innerWidth < 1025 ? true : false;
    if (innerWidth === 1366) {
      this.orientationFlag = screen.orientation.type === 'portrait-primary' ? true : false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:orientationchange')
  onOrientationChange(): void {
    this.orientationFlag = screen.orientation.type === 'portrait-primary' && innerWidth < 1025;
    if (innerWidth === 1366) {
      this.orientationFlag = screen.orientation.type === 'portrait-primary';
    }
  }

  refreshMaze(): void {
    this.levelMode$
      .pipe( takeUntil(this.destroy$) )
      .subscribe(mode => {
        this.maze = this.mazeService.generateMaze(mode);
        this.mazeService.refreshHeroLocation();
        this.startScore();
      })
  }

  heroStep(event: string): void {
    if (!this.debounceFlag) {
      return
    }
    const mazeCloned = _.cloneDeep(this.maze);
    const x = this.mazeService.heroLocation.x;
    const y = this.mazeService.heroLocation.y;

    switch (event) {
      case 'ArrowRight': {
        if (mazeCloned[y][x + 1] === 1) {
          this.mazeService.heroLocation.x = x + 1;
          mazeCloned[y][x] = 1;
          mazeCloned[y][this.mazeService.heroLocation.x] = 2;
        }
      }
      break;
      case 'ArrowUp': {
        if (mazeCloned[y - 1][x] === 1) {
          this.mazeService.heroLocation.y = y - 1;
          mazeCloned[y][x] = 1;
          mazeCloned[this.mazeService.heroLocation.y][x] = 2;
        }
      }
        break;
      case 'ArrowLeft': {
        if (mazeCloned[y][x - 1] === 1 && this.mazeService.heroLocation.x !== 0) {
          this.mazeService.heroLocation.x = x - 1;
          mazeCloned[y][x] = 1;
          mazeCloned[y][this.mazeService.heroLocation.x] = 2;
        }
      }
        break;
      case 'ArrowDown': {
        if (mazeCloned[y + 1][x] === 1) {
          this.mazeService.heroLocation.y = y + 1;
          mazeCloned[y][x] = 1;
          mazeCloned[this.mazeService.heroLocation.y][x] = 2;
        }
        if (mazeCloned[y + 1][x] === 3) {
          mazeCloned[y][x] = 1;
          mazeCloned[y + 1][x] = 4;
          this.win();
        }
      }
        break;
    }

    this.debounceFlag = false;
    this.maze = mazeCloned;
  }

  stopScore(): void {
    if (this.scoreTickSub$) {
      this.scoreTickSub$.unsubscribe();
    }
  }

  startScore(): void {
    this.store.dispatch(new ClearScore());
    this.store.dispatch(new UpdateIsWin(false));
    this.stopScore();
    this.scoreTickSub$ = interval(1000)
      .pipe(
        take(999),
        takeUntil( this.destroy$ )
        )
      .subscribe(() => {
        this.store.dispatch(new ScoreTick());
    });
  }

  win(): void {
    this.store.dispatch(new UpdateIsWin(true));
    this.stopScore();
    this.recordSub$ = combineLatest([this.levelMode$, this.score$, this.userName$, this.records$])
      .pipe( takeUntil(this.destroy$) )
      .subscribe(([mode, score, username, records]) => {
        if (!records ) {
          records = [];
          this.addRecord(mode, score, username, records);
        } else if (records.length < 10) {
          this.addRecord(mode, score, username, records);
        } else if(score < this.recordThreshold) {
          const cutRecords = records.filter((record, i) => i !== records.length - 1);
          this.addRecord(mode, score, username, cutRecords);
        }
      });
    this.recordSub$.unsubscribe();
  }

  addRecord(mode: string, score: number, username: string, records: fromModels.IRecord[]): void {
    mode = mode.slice(9);
    const payload: fromModels.IAddRecordRequestBody = {
      mode,
      records: [...records, { score, username, mode, date: new Date() }]
    };
    this.store.dispatch(new AddRecord(payload));
    const message = this.translateService.instant('maze.congratulations-this-is-new-record');
    this.snackBar.open(message, 'close',{
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
