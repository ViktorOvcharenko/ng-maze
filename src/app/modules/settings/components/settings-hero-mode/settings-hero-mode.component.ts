import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import * as fromModels from "../../../../core/models"

@Component({
  selector: 'app-settings-hero-mode',
  templateUrl: './settings-hero-mode.component.html',
  styleUrls: ['./settings-hero-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsHeroModeComponent {
  @Input() heroes: fromModels.IMode[];
  @Input() defaultHeroMode: string;
  @Output() onSelectHeroMode: EventEmitter<string> = new EventEmitter<string>();

  public selectHeroMode(heroMode: string): void {
    this.onSelectHeroMode.emit(heroMode);
  }
}
