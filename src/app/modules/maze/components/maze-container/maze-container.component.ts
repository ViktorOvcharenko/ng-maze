import { Component, Input } from '@angular/core';
import { IMaze } from "../../../../core/models/IMaze";

@Component({
  selector: 'app-maze-container',
  templateUrl: './maze-container.component.html',
  styleUrls: ['./maze-container.component.scss']
})
export class MazeContainerComponent {
  @Input() maze: IMaze;
}
