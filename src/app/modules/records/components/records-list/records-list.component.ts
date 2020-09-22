import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';

import * as fromModels from '../../../../core/models';

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordsListComponent implements OnInit {
  @Input() records: fromModels.IRecord[];
  public displayedColumns: string[] = ['position', 'username', 'score', 'date'];
  public dataSource: MatTableDataSource<fromModels.IRecord> = new MatTableDataSource(this.records);

  private lang = localStorage.getItem('language');

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
    if (this.lang) {
      this.translateService.currentLang = this.lang;
    }
  }
}
