import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RecordsListComponent } from '../records-list/records-list.component';

describe('RecordsListComponent', () => {
  let component: RecordsListComponent;
  let fixture: ComponentFixture<RecordsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecordsListComponent
      ],
      imports: [
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
