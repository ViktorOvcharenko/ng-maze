import {Component, EventEmitter, Output} from '@angular/core';

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
}
