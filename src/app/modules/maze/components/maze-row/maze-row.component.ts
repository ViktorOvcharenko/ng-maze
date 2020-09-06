import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-maze-row',
  templateUrl: './maze-row.component.html',
  styleUrls: ['./maze-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MazeRowComponent {
  @Input() row: number[];
  @Input() heroMode: string;
  @Input() wallMode: string;
}
