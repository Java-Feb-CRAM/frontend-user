import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookingFormComponent } from './edit-booking-form.component';
import {
  NgbActiveModal,
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDatepicker,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UpdatePassengerDto } from '../../dto/UpdatePassengerDto';
import { By } from '@angular/platform-browser';

class NgbActiveModalStub {
  close(result?: any): void {}
}

const passengers: UpdatePassengerDto[] = [
  {
    givenName: 'John',
    familyName: 'Smith',
    address: 'Texas',
    gender: 'Male',
    dob: '1996-10-08',
    id: 1,
  },
  {
    givenName: 'Jane',
    familyName: 'Doe',
    address: 'Virginia',
    gender: 'Female',
    dob: '2000-05-14',
    id: 2,
  },
];

describe('EditBookingFormComponent', () => {
  let component: EditBookingFormComponent;
  let fixture: ComponentFixture<EditBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBookingFormComponent],
      providers: [
        {
          provide: NgbActiveModal,
          useClass: NgbActiveModalStub,
        },
        FormBuilder,
        {
          provide: NgbDateAdapter,
          useClass: NgbDateNativeAdapter,
        },
      ],
      imports: [ReactiveFormsModule, NgbDatepickerModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookingFormComponent);
    component = fixture.componentInstance;
  });

  it('should populate passenger given names', async () => {
    component.originalPassengers = passengers;
    fixture.detectChanges();
    await fixture.whenStable();
    const de = fixture.debugElement.queryAll(By.css('#givenName'));
    const el1 = de[0].nativeElement;
    const el2 = de[1].nativeElement;
    expect(el1.value).toContain('John');
    expect(el2.value).toContain('Jane');
  });

  it('should populate passenger family names', async () => {
    component.originalPassengers = passengers;
    fixture.detectChanges();
    await fixture.whenStable();
    const de = fixture.debugElement.queryAll(By.css('#familyName'));
    const el1 = de[0].nativeElement;
    const el2 = de[1].nativeElement;
    expect(el1.value).toContain('Smith');
    expect(el2.value).toContain('Doe');
  });

  it('should populate passenger genders', async () => {
    component.originalPassengers = passengers;
    fixture.detectChanges();
    await fixture.whenStable();
    const de = fixture.debugElement.queryAll(By.css('#gender'));
    const el1 = de[0].nativeElement;
    const el2 = de[1].nativeElement;
    expect(el1.value).toContain('Male');
    expect(el2.value).toContain('Female');
  });

  it('should populate passenger addresses', async () => {
    component.originalPassengers = passengers;
    fixture.detectChanges();
    await fixture.whenStable();
    const de = fixture.debugElement.queryAll(By.css('#address'));
    const el1 = de[0].nativeElement;
    const el2 = de[1].nativeElement;
    expect(el1.value).toContain('Texas');
    expect(el2.value).toContain('Virginia');
  });

  it('should populate passenger birthdays', async () => {
    component.originalPassengers = passengers;
    fixture.detectChanges();
    await fixture.whenStable();
    const de = fixture.debugElement.queryAll(By.css('#dob'));
    const el1 = de[0].nativeElement;
    const el2 = de[1].nativeElement;
    expect(el1.value).toContain(passengers[0].dob);
    expect(el2.value).toContain(passengers[1].dob);
  });

  it('should render an hr if more than one passenger', () => {
    component.originalPassengers = passengers;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('hr'));
    expect(de).toBeTruthy();
  });

  it('should disable submit button if form is invalid', async () => {
    component.originalPassengers = passengers;
    fixture.detectChanges();
    component.passengers.controls[0].setValue({
      dob: new Date(),
      givenName: 'Rob',
      familyName: 'Maes',
      gender: 'abc',
      address: 'fsda',
      id: 1,
    });
    component.passengers.controls[0].markAllAsTouched();
    fixture.detectChanges();
    await fixture.whenStable();
    const de = fixture.debugElement.query(By.css('.btn-success'));
    const el: HTMLElement = de.nativeElement;
    expect(el.attributes.getNamedItem('disabled')).toBeTruthy();
  });

  it('should enable submit button if form is valid', () => {
    component.originalPassengers = passengers;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn-success'));
    const el: HTMLElement = de.nativeElement;
    expect(el.attributes.getNamedItem('disabled')).toBeFalsy();
  });

  it('should close the modal when clicking on cancel', () => {
    const modal = TestBed.get(NgbActiveModal);
    const spy = spyOn(modal, 'close');
    const de = fixture.debugElement.query(By.css('.btn-secondary'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith('cancel');
  });

  it('should close the modal when clicking on submit', async () => {
    const passenger: UpdatePassengerDto = {
      id: 1,
      givenName: 'Rob',
      familyName: 'Maes',
      address: 'Texas',
      gender: 'Male',
      dob: '1996-10-08',
    };
    component.originalPassengers = [passenger];
    fixture.detectChanges();
    await fixture.whenStable();
    const date = new Date('1996-10-08');
    date.setDate(date.getDate() + 1);
    component.passengers.controls[0].setValue({
      id: 1,
      givenName: 'Bob',
      familyName: 'Maes',
      address: 'Texas',
      gender: 'Male',
      dob: date,
    });
    const modal = TestBed.get(NgbActiveModal);
    const spy = spyOn(modal, 'close');
    fixture.detectChanges();
    await fixture.whenStable();
    const de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);
    expect(spy).toHaveBeenCalledWith({
      passengers: {
        '1': {
          givenName: 'Bob',
          familyName: 'Maes',
          dob: '1996-10-08',
          gender: 'Male',
          address: 'Texas',
        },
      },
    });
  });
});
