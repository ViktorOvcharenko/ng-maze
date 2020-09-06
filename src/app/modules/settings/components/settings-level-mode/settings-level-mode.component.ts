import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import * as fromModels from "../../../../core/models"

@Component({
  selector: 'app-settings-level-mode',
  templateUrl: './settings-level-mode.component.html',
  styleUrls: ['./settings-level-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsLevelModeComponent {
  @Input() modes: fromModels.IMode[];
  @Input() defaultMode: string;
  @Output() onSelectMode: EventEmitter<string> = new EventEmitter<string>();

  public selectMode(value: string): void {
    this.onSelectMode.emit(value);
  }
}
