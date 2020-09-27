import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmLogoutComponent } from './confirm-logout.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';


describe('ConfirmLogoutComponent', () => {
  let component: ConfirmLogoutComponent;
  let fixture: ComponentFixture<ConfirmLogoutComponent>;
  let dialogRef: MatDialogRef<ConfirmLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmLogoutComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        MatDialogModule
      ],
      providers: [
        {
          provide : MatDialogRef,
          useValue : {
            close: () => null
          }
        }
      ]
    })
      .compileComponents();
    dialogRef = TestBed.inject(MatDialogRef);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('confirm', () => {
    it('should call the close from dialogRef with true', () => {
      spyOn(dialogRef, 'close');

      component.confirm();

      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
  });

  describe('cancel', () => {
    it('should call the close from dialogRef with false', () => {
      spyOn(dialogRef, 'close');

      component.cancel();

      expect(dialogRef.close).toHaveBeenCalledWith(false);
    });
  });
});
