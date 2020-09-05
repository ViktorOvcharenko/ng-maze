import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import * as fromModels from "../../../../core/models"

@Component({
  selector: 'app-settings-hero',
  templateUrl: './settings-hero.component.html',
  styleUrls: ['./settings-hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsHeroComponent {
  @Input() heroes: fromModels.IHero[];
  @Input() defaultHero: string;
  @Output() onSelectHero: EventEmitter<string> = new EventEmitter<string>();

  public selectHero(value: string): void {
    this.onSelectHero.emit(value);
  }
}
