import { Component, Input } from '@angular/core';

import * as fromModels from '../../../../core/models';

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.scss']
})
export class RecordItemComponent {
  @Input() record: fromModels.IRecord;
  @Input() index: number;
}
