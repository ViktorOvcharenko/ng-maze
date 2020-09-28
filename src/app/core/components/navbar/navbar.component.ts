import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ConfirmLogoutComponent } from '../confirm-logout/confirm-logout.component';

import * as fromCoreServices from '../../services';


@Component({
  selector: 'app-navigation',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() drawer: MatDrawer;
  @Input() drawerLocation: boolean;
  public dialogRef: MatDialogRef<ConfirmLogoutComponent>

  constructor(
    private authService: fromCoreServices.AuthService,
    private dialog: MatDialog
  ) {}

  public logout():void {
    this.dialogRef = this.dialog.open(ConfirmLogoutComponent, { width: '300px' });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
      }
    });
  }

  public drawerClose(): void {
    this.drawer.close();
  }
}
