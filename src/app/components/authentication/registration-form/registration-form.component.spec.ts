import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationFormComponent } from './registration-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { PhonePipe } from '../../../pipes/phone.pipe';
import { RouterModule } from '@angular/router';

const formBuilderGroupEmpty = new FormBuilder().group({});
const usernameErrorText = 'Username can only have lowercase/uppercase letters, numbers and underscores with a length between 8 and 32 characters';

const validRegistrationFormData = {
  username: 'A_123456',
  password: 'Testing123!',
  matchingPassword: 'Testing123!',
  phone: '7776665555',
  email: 'craig@ss.com',
  familyName: 'Craig',
  givenName: 'Saunders',
}

const invalidRegistrationFormData = {
  username: 'A!123456',
  password: 'Testing',
  matchingPassword: 'Testing123',
  phone: '1',
  email: 'craig',
  familyName: '',
  givenName: 'S',
}

class UserServiceStub {
  register(): void { };
  checkRedirect(): void { };
  isJWTSet(): boolean { return false };
}

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent, PhonePipe],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceStub,
        },
      ],
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display username errors only on any error', async () => {
    fixture.whenStable().then(() => {
      let usernameElement = fixture.debugElement.query(By.css('#username')).nativeElement;
      let errorElement = fixture.debugElement.query(By.css('#usernameErrors'));
      expect(usernameElement).toBeTruthy();
      expect(errorElement).toBeTruthy(); // zero length
      usernameElement = fixture.debugElement.query(By.css('#username')).nativeElement;
      usernameElement.value = invalidRegistrationFormData.username;
      usernameElement.dispatchEvent(new Event('input'));
      errorElement = fixture.debugElement.query(By.css('#usernameErrors'));
      expect(errorElement).toBeTruthy();
      const displayedErrorElement = fixture.debugElement.query(By.css('#usernameErrors div')).nativeElement;
      expect((displayedErrorElement as HTMLDivElement).innerText)
        .toBe(usernameErrorText);
      usernameElement = fixture.debugElement.query(By.css('#username')).nativeElement;
      usernameElement.value = validRegistrationFormData.username;
      usernameElement.dispatchEvent(new Event('input'));
      errorElement = fixture.debugElement.query(By.css('#usernameErrors'));
      expect(errorElement).toBeFalsy(); // username with correct amount of characters and valid input
    });
  });

  it('should return with empty list of username errors if no error for controlname', async () => {
    fixture.whenStable().then(() => {
      expect(component.allErrors('username')).toEqual(['required']);
      const usernameElement = fixture.debugElement.query(By.css('#username')).nativeElement;
      usernameElement.value = validRegistrationFormData.username;
      usernameElement.dispatchEvent(new Event('input'));
      expect(component.allErrors('username')).toEqual([]);
    });
  });

  it('should submit and run login method onSubmit()', async () => {
    fixture.whenStable().then(() => {
      let submitButtonElement = fixture.debugElement.query(By.css('#submitButton')).nativeElement;
      expect((submitButtonElement as HTMLButtonElement).disabled).toBeTrue();

      const usernameElement = fixture.debugElement.query(By.css('#username')).nativeElement;
      usernameElement.value = validRegistrationFormData.username;
      usernameElement.dispatchEvent(new Event('input'));
      const passwordElement = fixture.debugElement.query(By.css('#password')).nativeElement;
      passwordElement.value = validRegistrationFormData.password;
      passwordElement.dispatchEvent(new Event('input'));
      const matchingPasswordElement = fixture.debugElement.query(By.css('#matchingPassword')).nativeElement;
      matchingPasswordElement.value = validRegistrationFormData.matchingPassword;
      matchingPasswordElement.dispatchEvent(new Event('input'));
      const phoneNumberElement = fixture.debugElement.query(By.css('#phone')).nativeElement;
      phoneNumberElement.value = validRegistrationFormData.phone;
      phoneNumberElement.dispatchEvent(new Event('input'));
      const emailElement = fixture.debugElement.query(By.css('#email')).nativeElement;
      emailElement.value = validRegistrationFormData.email;
      emailElement.dispatchEvent(new Event('input'));
      const familyNameElement = fixture.debugElement.query(By.css('#familyName')).nativeElement;
      familyNameElement.value = validRegistrationFormData.familyName;
      familyNameElement.dispatchEvent(new Event('input'));
      const givenNameElement = fixture.debugElement.query(By.css('#givenName')).nativeElement;
      givenNameElement.value = validRegistrationFormData.givenName;
      givenNameElement.dispatchEvent(new Event('input'));

      submitButtonElement = fixture.debugElement.query(By.css('#submitButton')).nativeElement;
      expect((submitButtonElement as HTMLButtonElement).disabled).toBeFalse();
      (submitButtonElement as HTMLButtonElement).click();
      expect((submitButtonElement as HTMLButtonElement).disabled).toBeFalse();
    });
  });

  it('should return invalid if no validations are set', async () => {
    fixture.whenStable().then(() => {
      component.registrationForm = formBuilderGroupEmpty;
      component.registrationForm.updateValueAndValidity();
      expect(component.allErrors('username')).toEqual([]);
      expect(component.hasErrors('username')).toBeFalse();
      expect(component.isFieldValid('username')).toBeFalse();
      expect(component.isFieldInvalid('username')).toBeFalse();
    });
  });
});