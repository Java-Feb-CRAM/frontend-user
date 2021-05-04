import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormComponent } from './payment-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  StripeCardCvcComponent,
  StripeCardExpiryComponent,
  StripeCardGroupDirective,
  StripeCardNumberComponent,
  StripeElementsService,
  StripeService,
} from 'ngx-stripe';
import { ItemizedBillComponent } from '../itemized-bill/itemized-bill.component';
import {
  CreateTokenCardData,
  StripeCardElement,
  StripeCardNumberElement,
  StripeElements,
  StripeElementsOptions,
  StripeError,
  Token,
} from '@stripe/stripe-js';
import { EMPTY, Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

class StripeServiceStub {
  createToken(
    tokenType: StripeCardElement | StripeCardNumberElement,
    data?: CreateTokenCardData
  ): Observable<{
    token?: Token;
    error?: StripeError;
  }> {
    return of({
      token: {
        id: 'ABC',
        object: 'token',
        client_ip: null,
        created: 0,
        livemode: false,
        type: 'card',
        used: false,
      },
    });
  }

  elements(options?: StripeElementsOptions): Observable<StripeElements> {
    return EMPTY;
  }
}

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;
  let stripeService: StripeService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PaymentFormComponent,
        ItemizedBillComponent,
        StripeCardNumberComponent,
        StripeCardGroupDirective,
        StripeCardExpiryComponent,
        StripeCardCvcComponent,
      ],
      providers: [
        {
          provide: StripeService,
          useClass: StripeServiceStub,
        },
        FormBuilder,
        StripeElementsService,
      ],
      imports: [HttpClientModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    stripeService = TestBed.get(StripeService);
    formBuilder = TestBed.get(FormBuilder);
  });

  it('should display ItemizedBillComponent', () => {
    component.passengerCount = 2;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.directive(ItemizedBillComponent));
    const el: HTMLElement = de.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should show error for invalid name', () => {
    fixture.detectChanges();
    component.stripeTest.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#name'));
    const el: HTMLElement = de.nativeElement;
    const de2 = fixture.debugElement.query(By.css('.invalid-feedback > div'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el.classList).toContain('is-invalid');
    expect(el2.innerText).toContain('required');
  });

  it('should highlight field in green for valid name', () => {
    fixture.detectChanges();
    component.stripeTest.setValue({
      name: 'John Smith',
    });
    component.stripeTest.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#name'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-valid');
  });

  it('should show error for invalid card number', () => {
    component.cardErrors.number = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#cardNumber'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-invalid');
  });

  it('should highlight field in green for valid card number', () => {
    component.cardValid.number = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#cardNumber'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-valid');
  });

  it('should show error for invalid card expiry', () => {
    component.cardErrors.expiry = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#cardExpiry'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-invalid');
  });

  it('should highlight field in green for valid card expiry', () => {
    component.cardValid.expiry = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#cardExpiry'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-valid');
  });

  it('should show error for invalid card CVC', () => {
    component.cardErrors.cvc = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#cardCvc'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-invalid');
  });

  it('should highlight field in green for valid card CVC', () => {
    component.cardValid.cvc = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#cardCvc'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-valid');
  });

  it('should disable submit button if form is invalid', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn-success'));
    const el: HTMLElement = de.nativeElement;
    expect(el.attributes.getNamedItem('disabled')).toBeTruthy();
  });

  it('should submit the form when clicking submit if the form is valid', () => {
    fixture.detectChanges();
    component.stripeTest.setValue({
      name: 'John Smith',
    });
    component.cardValid.number = true;
    component.cardValid.cvc = true;
    component.cardValid.expiry = true;
    spyOn(component.paymentFormSubmitEvent, 'emit');
    const spy = spyOn(component, 'pay').and.callThrough();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn-success'));
    const el: HTMLElement = de.nativeElement;
    expect(el.attributes.getNamedItem('disabled')).toBeFalsy();
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalled();
    expect(component.paymentFormSubmitEvent.emit).toHaveBeenCalledWith({
      stripeToken: 'ABC',
      name: 'John Smith',
    });
  });
});
