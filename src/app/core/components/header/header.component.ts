import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store';
import { getUserName } from '../../store/selectors/account.selectors';
import { getScore } from '../../store/selectors/maze.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() drawer: MatDrawer;
  userName$: Observable<string>;
  score$: Observable<number>;

  constructor(private store: Store) {
    this.userName$ = this.store.pipe(select(getUserName));
    this.score$ = this.store.pipe(select(getScore));
  }

  drawerToggle(): void {
    this.drawer.toggle();
  }
}
