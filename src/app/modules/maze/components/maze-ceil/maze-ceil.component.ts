import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-maze-ceil',
  templateUrl: './maze-ceil.component.html',
  styleUrls: ['./maze-ceil.component.scss']
})
export class MazeCeilComponent {
  @Input() ceil: number;
}
