import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as fromModels from '../../../../core/models';

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordItemComponent implements OnInit {
  @Input() record: fromModels.IRecord;
  @Input() index: number;
  private lang = localStorage.getItem('language');

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
    if (this.lang) {
      this.translateService.currentLang = this.lang;
    }
  }
}
