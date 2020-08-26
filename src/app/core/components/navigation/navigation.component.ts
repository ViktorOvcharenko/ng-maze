import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import * as fromCoreServices from '../../services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  @Input() drawerLocation: boolean;

  constructor(private authService: fromCoreServices.AuthService  ) {}

  public logout():void {
    this.authService.logout()
  }
}
