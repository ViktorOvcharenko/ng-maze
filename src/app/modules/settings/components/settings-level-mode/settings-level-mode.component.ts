import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import * as fromModels from "../../../../core/models"

@Component({
  selector: 'app-settings-level-mode',
  templateUrl: './settings-level-mode.component.html',
  styleUrls: ['./settings-level-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsLevelModeComponent {
  @Input() levels: fromModels.IMode[];
  @Input() defaultLevelMode: string;
  @Output() onSelectLevelMode: EventEmitter<string> = new EventEmitter<string>();

  selectLevelMode(levelMode: string): void {
    this.onSelectLevelMode.emit(levelMode);
  }
}
