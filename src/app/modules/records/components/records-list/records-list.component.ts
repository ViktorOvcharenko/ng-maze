import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import * as fromModels from '../../../../core/models';

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordsListComponent  {
  @Input() records: fromModels.IRecord[]
}
