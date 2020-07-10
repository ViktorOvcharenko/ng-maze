import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-maze-control',
  templateUrl: './maze-control.component.html',
  styleUrls: ['./maze-control.component.scss']
})
export class MazeControlComponent {
  @Output() onRefreshMaze: EventEmitter<void> = new EventEmitter<void>();

  public refreshMaze(): void {
    this.onRefreshMaze.emit();
  }

  public heroStep(direction: string, ): void {
    switch(direction) {
      case 'left':
        console.log('left');
        break;
      case 'up':
        console.log('up');
        break;
      case 'right':
        console.log('right');
        break;
      case 'down':
        console.log('down');
        break;
    }
  }

  @HostListener('document:keydown', ['$event'])
  public heroStepFromKeyboard(event: KeyboardEvent): void {
    switch(event.key) {
      case 'ArrowLeft':
        console.log('left');
        break;
      case 'ArrowUp':
        console.log('up');
        break;
      case 'ArrowRight':
        console.log('right');
        break;
      case 'ArrowDown':
        console.log('down');
        break;
    }
  }
}
