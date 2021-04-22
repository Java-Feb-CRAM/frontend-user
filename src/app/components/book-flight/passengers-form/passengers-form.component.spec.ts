import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersFormComponent } from './passengers-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepickerModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

describe('PassengersFormComponent', () => {
  let component: PassengersFormComponent;
  let fixture: ComponentFixture<PassengersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PassengersFormComponent],
      providers: [
        FormBuilder,
        {
          provide: NgbDateAdapter,
          useClass: NgbDateNativeAdapter,
        },
      ],
      imports: [NgbDatepickerModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the total number of passengers', () => {
    component.addPassenger();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.badge'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('2');
  });

  it('should add another passenger form when clicking the add passenger button', () => {
    const de = fixture.debugElement.query(By.css('.btn-primary'));
    de.triggerEventHandler('click', null);
    fixture.detectChanges();
    const de2 = fixture.debugElement.queryAll(
      By.css('.card-body  .card-header')
    );
    expect(de2.length).toBe(2);
  });

  it('should show the passenger number in the card header', () => {
    const de = fixture.debugElement.query(
      By.css('.card-body .card-header .align-self-center')
    );
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('1');
  });

  it('should remove the passenger form when clicking the remove passenger button if there is more than one passenger', () => {
    component.addPassenger();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn-danger'));
    de.triggerEventHandler('click', null);
    expect(component.passengers.length).toBe(1);
  });

  it('should not show the remove passenger button for the first passenger form', () => {
    const de = fixture.debugElement.query(By.css('.btn-danger'));
    expect(de).toBeFalsy();
  });

  it('should show error for invalid first name', () => {
    component.passengersForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#givenName'));
    const el: HTMLElement = de.nativeElement;
    const de2 = fixture.debugElement.query(
      By.css('#givenName + .invalid-feedback')
    );
    const el2: HTMLElement = de2.nativeElement;
    expect(el.classList).toContain('is-invalid');
    expect(el2.innerHTML).toContain('required');
  });

  it('should highlight field in green for valid first name', () => {
    component.passengers.controls[0].setValue({
      givenName: 'John',
      familyName: '',
      dob: '',
      gender: '',
      address: '',
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#givenName'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-valid');
  });

  it('should show error for invalid last name', () => {
    component.passengersForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#familyName'));
    const el: HTMLElement = de.nativeElement;
    const de2 = fixture.debugElement.query(
      By.css('#familyName + .invalid-feedback')
    );
    const el2: HTMLElement = de2.nativeElement;
    expect(el.classList).toContain('is-invalid');
    expect(el2.innerHTML).toContain('required');
  });

  it('should highlight field in green for valid last name', () => {
    component.passengers.controls[0].setValue({
      givenName: '',
      familyName: 'Smith',
      dob: '',
      gender: '',
      address: '',
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#familyName'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-valid');
  });
  it('should show error for invalid birthday', () => {
    component.passengersForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#dob'));
    const el: HTMLElement = de.nativeElement;
    const de2 = fixture.debugElement.query(By.css('#dob ~ .invalid-feedback'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el.classList).toContain('is-invalid');
    expect(el2.innerHTML).toContain('required');
  });

  it('should highlight field in green for valid birthday', () => {
    component.passengers.controls[0].setValue({
      givenName: '',
      familyName: '',
      dob: new Date(),
      gender: '',
      address: '',
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#dob'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-valid');
  });
  it('should show error for invalid gender', () => {
    component.passengersForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#gender'));
    const el: HTMLElement = de.nativeElement;
    const de2 = fixture.debugElement.query(
      By.css('#gender + .invalid-feedback')
    );
    const el2: HTMLElement = de2.nativeElement;
    expect(el.classList).toContain('is-invalid');
    expect(el2.innerHTML).toContain('Select');
  });

  it('should highlight field in green for valid gender', () => {
    component.passengers.controls[0].setValue({
      givenName: '',
      familyName: '',
      dob: '',
      gender: 'Male',
      address: '',
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#gender'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-valid');
  });
  it('should show error for invalid address', () => {
    component.passengersForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#address'));
    const el: HTMLElement = de.nativeElement;
    const de2 = fixture.debugElement.query(
      By.css('#address + .invalid-feedback')
    );
    const el2: HTMLElement = de2.nativeElement;
    expect(el.classList).toContain('is-invalid');
    expect(el2.innerHTML).toContain('required');
  });

  it('should highlight field in green for valid address', () => {
    component.passengers.controls[0].setValue({
      givenName: '',
      familyName: '',
      dob: '',
      gender: '',
      address: 'Texas',
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#address'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-valid');
  });

  it('should disable submit button if form is invalid', () => {
    const de = fixture.debugElement.query(By.css('.mt-3.btn.btn-primary'));
    const el: HTMLElement = de.nativeElement;
    expect(el.attributes.getNamedItem('disabled')).toBeTruthy();
  });
  it('should submit the form when clicking submit if the form is valid', () => {
    const dob = new Date(1996, 10, 8);
    component.passengers.controls[0].setValue({
      givenName: 'John',
      familyName: 'Smith',
      dob,
      gender: 'Male',
      address: 'Texas',
    });
    spyOn(component.passengersFormSubmitEvent, 'emit');
    const spy = spyOn(component, 'onSubmit').and.callThrough();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.mt-3.btn.btn-primary'));
    const el: HTMLElement = de.nativeElement;
    expect(el.attributes.getNamedItem('disabled')).toBeFalsy();
    const de2 = fixture.debugElement.query(By.css('form'));
    de2.triggerEventHandler('ngSubmit', null);
    expect(spy).toHaveBeenCalled();

    expect(component.passengersFormSubmitEvent.emit).toHaveBeenCalledWith({
      passengers: [
        {
          givenName: 'John',
          familyName: 'Smith',
          dob: dob.toISOString().split('T')[0],
          gender: 'Male',
          address: 'Texas',
        },
      ],
    });
  });
});
