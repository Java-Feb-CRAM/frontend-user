import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailValidationPageComponent } from './email-validation-page.component';

describe('EmailValidationPageComponent', () => {
  let component: EmailValidationPageComponent;
  let fixture: ComponentFixture<EmailValidationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailValidationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailValidationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
