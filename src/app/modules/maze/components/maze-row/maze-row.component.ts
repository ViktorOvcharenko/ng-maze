import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-maze-row',
  templateUrl: './maze-row.component.html',
  styleUrls: ['./maze-row.component.scss']
})
export class MazeRowComponent {
  @Input() row: number[];
}
