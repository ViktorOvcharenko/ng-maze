import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import * as fromModels from '../../../../core/models';

@Component({
  selector: 'app-maze-container',
  templateUrl: './maze-container.component.html',
  styleUrls: ['./maze-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MazeContainerComponent {
  @Input() maze: fromModels.IMaze;
}
