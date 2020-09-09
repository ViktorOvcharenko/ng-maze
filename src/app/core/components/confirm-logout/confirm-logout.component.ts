import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-logout',
  templateUrl: './confirm-logout.component.html'
})
export class ConfirmLogoutComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmLogoutComponent>) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
