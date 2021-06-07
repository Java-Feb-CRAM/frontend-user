import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookingFormComponent } from './guest-booking-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PhonePipe } from '../../../pipes/phone.pipe';
import { By } from '@angular/platform-browser';

describe('GuestBookingFormComponent', () => {
  let component: GuestBookingFormComponent;
  let fixture: ComponentFixture<GuestBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestBookingFormComponent, PhonePipe],
      providers: [FormBuilder],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show error for invalid email', () => {
    component.guestBookingForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#guestEmail'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-invalid');
    const de2 = fixture.debugElement.query(
      By.css('#guestEmail ~ .invalid-feedback')
    );
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerHTML).toContain('required');
  });

  it('should highlight field in green for valid email', () => {
    component.guestBookingForm.setValue({
      guestEmail: 'example@example.com',
      guestPhone: '',
    });
    component.guestBookingForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#guestEmail'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-valid');
  });

  it('should show error for invalid phone number', () => {
    component.guestBookingForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#guestPhone'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-invalid');
    const de2 = fixture.debugElement.query(
      By.css('#guestPhone ~ .invalid-feedback')
    );
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerHTML).toContain('required');
  });

  it('should highlight field in green for valid phone number', () => {
    component.guestBookingForm.setValue({
      guestEmail: '',
      guestPhone: '281-292-1451',
    });
    component.guestBookingForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#guestPhone'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-valid');
  });

  it('should disable submit button if form is invalid', () => {
    const de = fixture.debugElement.query(By.css('.btn-primary'));
    const el: HTMLElement = de.nativeElement;
    expect(el.attributes.getNamedItem('disabled')).toBeTruthy();
  });

  it('should submit the form when clicking submit if the form is valid', () => {
    component.guestBookingForm.setValue({
      guestEmail: 'example@example.com',
      guestPhone: '281-292-1451',
    });
    spyOn(component.guestBookingFormSubmitEvent, 'emit');
    const spy = spyOn(component, 'onSubmit').and.callThrough();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn-primary'));
    const el: HTMLElement = de.nativeElement;
    expect(el.attributes.getNamedItem('disabled')).toBeFalsy();
    const de2 = fixture.debugElement.query(By.css('form'));
    de2.triggerEventHandler('ngSubmit', null);
    expect(spy).toHaveBeenCalled();
    expect(component.guestBookingFormSubmitEvent.emit).toHaveBeenCalledWith({
      guestEmail: 'example@example.com',
      guestPhone: '281-292-1451',
    });
  });
});
