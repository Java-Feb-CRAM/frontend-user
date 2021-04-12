import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePaymentComponent } from './stripe-payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';

describe('StripePaymentComponent', () => {
  let component: StripePaymentComponent;
  let fixture: ComponentFixture<StripePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgxStripeModule.forRoot(
          'pk_test_51IbSmqKMAXXjSzaxL3WIYu5kSzambFamCzc2LhMp5AtyOOhwjoh5PJKq2He2N566ECIPpvHYZU7yq5PAt9sMJG4H00MTCuphgp'
        ),
      ],
      declarations: [StripePaymentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
