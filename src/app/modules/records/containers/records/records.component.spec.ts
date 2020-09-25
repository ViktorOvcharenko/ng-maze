import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RecordsComponent } from '../records/records.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import {of} from 'rxjs';

describe('RecordsComponent', () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;
  let store: Store<any>;
  const record = {
    score: 1,
    username: 'test',
    date: new Date(),
    mode: 'test'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsComponent ],
      imports: [ TranslateModule.forRoot() ],
      providers: [  provideMockStore(), ]
    })
    .compileComponents();
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
    component.levelMode$ = of('test');
    component.records$ = of([record]);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
