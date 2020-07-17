import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as fromModels from "../../../../core/models"

@Component({
  selector: 'app-settings-mode',
  templateUrl: './settings-mode.component.html',
  styleUrls: ['./settings-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsModeComponent {
  @Input() modes: fromModels.IMode[];
  @Input() defaultMode: string;
  @Output() onSelectMode: EventEmitter<string> = new EventEmitter<string>();

  public selectMode(value: string): void {
    this.onSelectMode.emit(value);
  }
}
