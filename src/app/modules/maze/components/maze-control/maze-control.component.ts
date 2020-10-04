import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-maze-control',
  templateUrl: './maze-control.component.html',
  styleUrls: ['./maze-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MazeControlComponent {
  @Input() win: boolean;
  @Output() onRefreshMaze: EventEmitter<void> = new EventEmitter<void>();
  @Output() onHeroStep: EventEmitter<string> = new EventEmitter<string>();

  public refreshMaze(): void {
    this.onRefreshMaze.emit();
  }

  public heroStep(direction: string, ): void {
    if (!this.win) {
      this.onHeroStep.emit(direction);
    }
  }

  @HostListener('document:keydown', ['$event'])
  public heroStepFromKeyboard(event: KeyboardEvent): void {
    if (!this.win) {
      this.onHeroStep.emit(event.key);
    }
  }
}
