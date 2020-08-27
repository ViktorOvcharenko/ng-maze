import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import * as fromCoreServices from '../../services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  @Input() drawer: MatDrawer;
  @Input() drawerLocation: boolean;

  constructor(private authService: fromCoreServices.AuthService  ) {}

  public logout():void {
    this.authService.logout()
  }

  public drawerClose(): void {
    this.drawer.close();
  }
}
