import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  Input,
} from '@angular/core';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import {
  StripeCardCvcElementChangeEvent,
  StripeCardElementChangeEvent,
  StripeCardElementOptions,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PaymentFormData {
  stripeToken: string;
  name: string;
}

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  @Input() passengerCount = 0;
  @Output() paymentFormSubmitEvent = new EventEmitter<PaymentFormData>();

  // @ts-ignore
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        lineHeight: '1.429',
        iconColor: '#666EE8',
        color: '#495057',
        fontWeight: 'normal',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontSize: '16px',
        '::placeholder': {
          color: '#6C757D',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  // @ts-ignore
  stripeTest: FormGroup;

  cardErrors: any = {
    number: null,
    expiry: null,
    cvc: null,
  };

  cardValid: any = {
    number: false,
    expiry: false,
    cvc: false,
  };

  constructor(private fb: FormBuilder, private stripeService: StripeService) {}
  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  pay(): void {
    const name = this.stripeTest.get('name')?.value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          this.paymentFormSubmitEvent.emit({
            stripeToken: result.token.id,
            name: this.stripeTest.controls.name.value,
          });
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }

  validateCardNumber(event: StripeCardNumberElementChangeEvent): void {
    if (event.error) {
      this.cardErrors.number = event.error.message;
    } else {
      this.cardErrors.number = null;
    }
    this.cardValid.number = event.complete;
  }
  validateCardExpiry(event: StripeCardExpiryElementChangeEvent): void {
    if (event.error) {
      this.cardErrors.expiry = event.error.message;
    } else {
      this.cardErrors.expiry = null;
    }
    this.cardValid.expiry = event.complete;
  }
  validateCardCvc(event: StripeCardCvcElementChangeEvent): void {
    if (event.error) {
      this.cardErrors.cvc = event.error.message;
    } else {
      this.cardErrors.cvc = null;
    }
    this.cardValid.cvc = event.complete;
  }

  isCardValid(): boolean {
    return this.cardValid.number && this.cardValid.expiry && this.cardValid.cvc;
  }

  isFormValid(): boolean {
    return this.stripeTest.valid && this.isCardValid();
  }

  isFieldInvalid(controlName: string): boolean {
    return Boolean(
      this.stripeTest.get(controlName)?.invalid &&
        (this.stripeTest.get(controlName)?.dirty ||
          this.stripeTest.get(controlName)?.touched)
    );
  }

  isFieldValid(controlName: string): boolean {
    return Boolean(this.stripeTest.get(controlName)?.valid);
  }

  validationClass(controlName: string): any {
    return {
      'is-invalid': this.isFieldInvalid(controlName),
      'is-valid': this.isFieldValid(controlName),
    };
  }
}
