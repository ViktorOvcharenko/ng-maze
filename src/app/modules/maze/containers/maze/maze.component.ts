import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AddRecord,
  ClearScore,
  GetRecords,
  ScoreTick,
  UpdateIsWinn
} from '../../../../core/store/actions/maze.actions';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  getLevelMode,
  getWin,
  getScore,
  getRecords,
  getHeroMode
} from '../../../../core/store/selectors/maze.selectors';
import { getUserName } from '../../../../core/store/selectors/account.selector';

import * as _ from 'lodash';
import * as fromModels from '../../../../core/models';
import * as fromServices from '../../../../core/services';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit, OnDestroy {
  public maze: fromModels.IMaze;
  public levelMode$: Observable<string>;
  public heroMode$: Observable<string>;
  public win$: Observable<boolean>;
  public score$: Observable<number>;
  public userName$: Observable<string>;
  public records$: Observable<fromModels.IRecord[]>;
  public debounceFlag = true;
  public orientationFlag: boolean;
  public recordThreshold: number;
  public levelModeSub$: Subscription;
  public scoreTickSub$: Subscription;
  public debounceFlagSub$: Subscription;
  public recordSub$: Subscription;
  public recordsSub$: Subscription;

  constructor(
    private mazeService: fromServices.MazeService,
    private store: Store,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {
    this.levelMode$ = this.store.pipe(select(getLevelMode));
    this.heroMode$ = this.store.pipe(select(getHeroMode));
    this.win$ = this.store.pipe(select(getWin));
    this.score$ = this.store.pipe(select(getScore));
    this.userName$ = this.store.pipe(select(getUserName));
    this.records$ = this.store.pipe(select(getRecords));
  }

  ngOnInit(): void {
    this.levelModeSub$ = this.levelMode$
      .subscribe(mode => {
        this.maze = this.mazeService.generateMaze(mode);
        this.store.dispatch( new GetRecords(mode) );
      });
    this.refreshMaze();
    this.debounceFlagSub$ = interval(100)
      .subscribe(() => this.debounceFlag = true);
    this.recordsSub$ = this.records$
      .subscribe(records => {
        if (records && records.length) {
          this.recordThreshold = records[records.length - 1].score;
        }
      });
    this.orientationFlag = screen.orientation.type === 'portrait-primary' && innerWidth < 1025 ? true : false;
  }

  ngOnDestroy(): void {
    if (this.levelModeSub$) {
      this.levelModeSub$.unsubscribe();
    }
    if (this.scoreTickSub$) {
      this.scoreTickSub$.unsubscribe();
    }
    if (this.debounceFlagSub$) {
      this.debounceFlagSub$.unsubscribe();
    }
    if (this.recordSub$) {
      this.recordSub$.unsubscribe();
    }
    if (this.recordsSub$) {
      this.recordsSub$.unsubscribe();
    }
  }

  @HostListener('window:orientationchange')
  public onOrientationChange(): void {
    this.orientationFlag = screen.orientation.type === 'portrait-primary' && innerWidth < 1025 ? true : false;
  }

  public refreshMaze(): void {
    this.levelModeSub$ = this.levelMode$
      .subscribe(mode => {
        this.maze = this.mazeService.generateMaze(mode);
        this.mazeService.refreshHeroLocation();
        this.startScore();
      })
  }

  public heroStep(event: string): void {
    if (!this.debounceFlag) {
      return
    }
    const mazeCloned = _.cloneDeep(this.maze);
    const x = this.mazeService.heroLocation.x;
    const y = this.mazeService.heroLocation.y;

    switch (event) {
      case 'right': {
        if (mazeCloned[y][x + 1] === 1) {
          this.mazeService.heroLocation.x = x + 1;
          mazeCloned[y][x] = 1;
          mazeCloned[y][this.mazeService.heroLocation.x] = 2;
        }
      }
      break;
      case 'up': {
        if (mazeCloned[y - 1][x] === 1) {
          this.mazeService.heroLocation.y = y - 1;
          mazeCloned[y][x] = 1;
          mazeCloned[this.mazeService.heroLocation.y][x] = 2;
        }
      }
        break;
      case 'left': {
        if (mazeCloned[y][x - 1] === 1 && this.mazeService.heroLocation.x !== 0) {
          this.mazeService.heroLocation.x = x - 1;
          mazeCloned[y][x] = 1;
          mazeCloned[y][this.mazeService.heroLocation.x] = 2;
        }
      }
        break;
      case 'down': {
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

  private stopScore(): void {
    if (this.scoreTickSub$) {
      this.scoreTickSub$.unsubscribe();
    }
  }

  private startScore(): void {
    this.store.dispatch(new ClearScore());
    this.store.dispatch(new UpdateIsWinn(false));

    if (this.scoreTickSub$) {
      this.scoreTickSub$.unsubscribe();
    }

    this.scoreTickSub$ = interval(1000)
      .pipe(take(999))
      .subscribe(() => {
        this.store.dispatch(new ScoreTick());
    });
  }

  private win(): void {
    this.store.dispatch(new UpdateIsWinn(true));
    this.stopScore();
    this.recordSub$ = combineLatest([this.levelMode$, this.score$, this.userName$, this.records$])
      .subscribe(([mode, score, username, records]) => {
        if (!records || records.length < 10 || score < this.recordThreshold ) {
          const message = this.translateService.instant('maze.congratulations-this-is-new-record');
          mode = mode.slice(9);
          if(!records) {
            records = [];
          }
          const payload: fromModels.IAddRecordRequestBody = {
            mode,
            records: [...records, { score, username, mode, date: new Date() }]
          };
          this.store.dispatch(new AddRecord(payload));
          this.snackBar.open(message, 'close',{
            verticalPosition: 'top',
            duration: 5000
          });
        }
      });
    this.recordSub$.unsubscribe();
  }
}
