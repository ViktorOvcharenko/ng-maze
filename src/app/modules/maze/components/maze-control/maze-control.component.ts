import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-maze-control',
  templateUrl: './maze-control.component.html',
  styleUrls: ['./maze-control.component.scss']
})
export class MazeControlComponent {
  @Output() onRefreshMaze: EventEmitter<void> = new EventEmitter<void>();
  @Output() onHeroStep: EventEmitter<string> = new EventEmitter<string>();

  public refreshMaze(): void {
    this.onRefreshMaze.emit();
  }

  public heroStep(direction: string, ): void {
    this.onHeroStep.emit(direction);
  }

  @HostListener('document:keydown', ['$event'])
  public heroStepFromKeyboard(event: KeyboardEvent): void {
    switch(event.key) {
      case 'ArrowLeft':
        this.onHeroStep.emit('left');
        break;
      case 'ArrowUp':
        this.onHeroStep.emit('up');
        break;
      case 'ArrowRight':
        this.onHeroStep.emit('right');
        break;
      case 'ArrowDown':
        this.onHeroStep.emit('down');
        break;
    }
  }
}
