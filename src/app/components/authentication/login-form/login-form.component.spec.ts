import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CredentialsDto } from 'src/app/models/CredentialsDto';
import { UserService } from 'src/app/services/user.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';

const validCredentials = new CredentialsDto('A1234567', 'Testing123!');

const formBuilderGroupEmpty = new FormBuilder().group({});

class UserServiceStub {
  login(): void {}
  checkRedirect(): void {}
  isJWTSet(): boolean {
    return false;
  }
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      providers: [
        HeaderComponent,
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
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display username errors only on any error', async () => {
    fixture.whenStable().then(() => {
      let usernameElement = fixture.debugElement.query(By.css('#username'))
        .nativeElement;
      let errorElement = fixture.debugElement.query(By.css('#usernameErrors'));
      expect(usernameElement).toBeTruthy();
      expect(errorElement).toBeTruthy(); // zero length
      usernameElement = fixture.debugElement.query(By.css('#username'))
        .nativeElement;
      usernameElement.value = 'A1234567!';
      usernameElement.dispatchEvent(new Event('input'));
      errorElement = fixture.debugElement.query(By.css('#usernameErrors'));
      expect(errorElement).toBeTruthy();
      const displayedErrorElement = fixture.debugElement.query(
        By.css('#usernameErrors div')
      ).nativeElement;
      expect((displayedErrorElement as HTMLDivElement).innerText).toBe(
        'Username can only have lowercase/uppercase letters, numbers and underscores with a length between 8 and 32 characters'
      );
      usernameElement = fixture.debugElement.query(By.css('#username'))
        .nativeElement;
      usernameElement.value = validCredentials.username;
      usernameElement.dispatchEvent(new Event('input'));
      errorElement = fixture.debugElement.query(By.css('#usernameErrors'));
      expect(errorElement).toBeFalsy(); // username with correct amount of characters and valid input
    });
  });

  it('should return with empty list of username errors if no error for controlname', async () => {
    fixture.whenStable().then(() => {
      expect(component.allErrors('username')).toEqual(['required']);
      const usernameElement = fixture.debugElement.query(By.css('#username'))
        .nativeElement;
      usernameElement.value = validCredentials.username;
      usernameElement.dispatchEvent(new Event('input'));
      expect(component.allErrors('username')).toEqual([]);
    });
  });

  it('should submit and run login method onSubmit()', async () => {
    fixture.whenStable().then(() => {
      let submitButtonElement = fixture.debugElement.query(
        By.css('#submitButton')
      ).nativeElement;
      expect((submitButtonElement as HTMLButtonElement).disabled).toBeTrue();
      const usernameElement = fixture.debugElement.query(By.css('#username'))
        .nativeElement;
      usernameElement.value = validCredentials.username;
      usernameElement.dispatchEvent(new Event('input'));
      const passwordElement = fixture.debugElement.query(By.css('#password'))
        .nativeElement;
      passwordElement.value = validCredentials.password;
      passwordElement.dispatchEvent(new Event('input'));
      submitButtonElement = fixture.debugElement.query(By.css('#submitButton'))
        .nativeElement;
      expect((submitButtonElement as HTMLButtonElement).disabled).toBeFalse();
      (submitButtonElement as HTMLButtonElement).click();
      expect((submitButtonElement as HTMLButtonElement).disabled).toBeFalse();
    });
  });

  it('should return invalid if no validations are set', async () => {
    fixture.whenStable().then(() => {
      component.loginForm = formBuilderGroupEmpty;
      component.loginForm.updateValueAndValidity();
      expect(component.allErrors('username')).toEqual([]);
      expect(component.hasErrors('username')).toBeFalse();
      expect(component.isFieldValid('username')).toBeFalse();
      expect(component.isFieldInvalid('username')).toBeFalse();
    });
  });
});
