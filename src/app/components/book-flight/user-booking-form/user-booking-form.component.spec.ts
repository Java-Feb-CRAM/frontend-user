import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingFormComponent } from './user-booking-form.component';
import { By } from '@angular/platform-browser';

describe('UserBookingFormComponent', () => {
  let component: UserBookingFormComponent;
  let fixture: ComponentFixture<UserBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBookingFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingFormComponent);
    component = fixture.componentInstance;
  });

  it('should display users email', async () => {
    component.user = {
      email: 'example@example.com',
    };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const de = fixture.debugElement.query(By.css('#userEmail'));
      const el = de.nativeElement;
      expect(el.value).toBe('example@example.com');
    });
  });

  it('should display users phone', async () => {
    component.user = {
      phoneNumber: '281-292-1451',
    };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const de = fixture.debugElement.query(By.css('#userPhone'));
      const el = de.nativeElement;
      expect(el.value).toBe('281-292-1451');
    });
  });

  it('should submit', () => {
    component.user = {
      email: 'example@example.com',
      phoneNumber: '281-292-1451',
    };
    spyOn(component.userBookingFormSubmitEvent, 'emit');
    const spy = spyOn(component, 'onSubmit').and.callThrough();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalled();
    expect(component.userBookingFormSubmitEvent.emit).toHaveBeenCalledWith(
      true
    );
  });
});
