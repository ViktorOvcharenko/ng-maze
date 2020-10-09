import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RecordsListComponent } from '../records-list/records-list.component';

describe('RecordsListComponent', () => {
  let component: RecordsListComponent;
  let fixture: ComponentFixture<RecordsListComponent>;
  let translateService: TranslateService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsListComponent ],
      imports: [ TranslateModule.forRoot() ],
      providers: [ TranslateService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
    translateService = TestBed.inject(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should call currentLang from translateService if lang is exist',  () => {
      spy = spyOnProperty(translateService, 'currentLang', 'set');
      component.lang = 'test';
      component.ngOnInit();

      expect(spy).toHaveBeenCalled();
    });

    it(`shouldn't call currentLang from translateService if lang isn't exist`,  () => {
      spy = spyOnProperty(translateService, 'currentLang', 'set');
      component.lang = null;
      component.ngOnInit();

      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});
