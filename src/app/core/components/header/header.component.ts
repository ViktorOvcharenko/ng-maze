import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import { getUserName } from '../../store/selectors/account.selector';
import * as fromCoreServices from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() drawer: MatDrawer;
  public userName$: Observable<string>;

  constructor(
    private authService: fromCoreServices.AuthService,
    private router: Router,
    private store: Store
  ) {
    this.userName$ = this.store.pipe(select(getUserName));
  }

  public drawerToggle(): void {
    this.drawer.toggle();
  }

  public logout():void {
    this.authService.logout()
    this.router.navigate(['/auth', 'login']);
  }
}
