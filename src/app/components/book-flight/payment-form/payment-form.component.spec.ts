import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormComponent } from './payment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule, StripeService } from 'ngx-stripe';

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgxStripeModule.forRoot(
          'pk_test_51IbSmqKMAXXjSzaxL3WIYu5kSzambFamCzc2LhMp5AtyOOhwjoh5PJKq2He2N566ECIPpvHYZU7yq5PAt9sMJG4H00MTCuphgp'
        ),
      ],
      declarations: [PaymentFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
