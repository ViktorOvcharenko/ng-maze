import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import * as fromModels from "../../../../core/models"

@Component({
  selector: 'app-settings-wall-mode',
  templateUrl: './settings-wall-mode.component.html',
  styleUrls: ['./settings-wall-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsWallModeComponent {
  @Input() walls: fromModels.IMode[];
  @Input() defaultWallMode: string;
  @Output() onSelectWallMode: EventEmitter<string> = new EventEmitter<string>();

  selectWallMode(wallMode: string): void {
    this.onSelectWallMode.emit(wallMode);
  }
}
