import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

export interface RegistrationFormData {
  username?: string;
  password?: string;
  matchingPassword?: string;
  phone?: string;
  email?: string;
  familyName?: string;
  givenName?: string;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  @Output()
  registrationFormSubmitEvent = new EventEmitter<RegistrationFormData>();
  registrationForm: FormGroup;
  validationErrors = {
    username: {
      required: 'Username is required',
      minLength: 'Username must be a minimum of 8 characters',
      maxLength: 'Username must be a maximum of 32 characters',
      pattern:
        'Username can only have lowercase/uppercase letters, numbers ' +
        'and underscores with a length between 8 and 32 characters',
    },
    password: {
      required: 'Password is required',
      minLength: 'Password must be a minimum of 8 characters',
      maxLength: 'Password must be a maximum of 32 characters',
      pattern:
        'Password must contain: 1 uppercase letter ' +
        '1 lowercase letter 1 number 1 of these symbols: @!#$%^&*_+=~' +
        'with a length between 8 and 32 characters',
    },
    matchingPassword: {
      required: 'Confirm password is required',
      minLength: 'Confirm password must be a minimum of 8 characters',
      maxLength: 'Confirm password must be a maximum of 32 characters',
      pattern: 'Confirm password must match the password you first typed',
    },
    email: {
      required: 'Email is required',
      email: 'Email must be a valid email',
    },
    phone: {
      required: 'Phone number is required',
      minLength: 'Phone number must be a minimum of 10 characters',
      maxLength: 'Phone number must be a maximum of 24 characters',
      pattern: 'Phone number must have a length of 10 to 24',
    },
    givenName: {
      required: 'First name is required',
      minLength: 'First name must be a minimum of 2 characters',
      maxLength: 'First name must be a maximum of 32 characters',
      pattern: 'First name must have a length of 2 to 32',
    },
    familyName: {
      required: 'Last name is required',
      minLength: 'Last name must be a minimum of 2 characters',
      maxLength: 'Last name must be a maximum of 32 characters',
      pattern: 'Last name must have a length of 2 to 32',
    },
  };

  constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern('^[a-zA-Z]+[a-zA-Z\\d_]{7,31}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@!#$%^&*_+=~])[A-Za-z\\d@!#$%^&*_+=~]{8,32}$'
          ),
        ],
      ],
      matchingPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@!#$%^&*_+=~])[A-Za-z\\d@!#$%^&*_+=~]{8,32}$'),
        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(24),
          Validators.pattern('^.{10,24}$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      familyName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32),
          Validators.pattern('^.{2,32}$'),
        ],
      ],
      givenName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32),
          Validators.pattern('^.{2,32}$'),
        ],
      ],
    });

    this.registrationForm.get('password')?.valueChanges.subscribe({
      next: (passwordValue: string) => {
        this.registrationForm
          .get('matchingPassword')
          ?.setValidators([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(32),
            Validators.pattern(`^${passwordValue}$`),
          ]);
      },
    });
    this.userService.checkRedirect();
  }

  isFieldInvalid(controlName: string): boolean {
    return Boolean(
      this.registrationForm.get(controlName)?.invalid &&
      (this.registrationForm.get(controlName)?.dirty ||
        this.registrationForm.get(controlName)?.touched)
    );
  }

  isFieldValid(controlName: string): boolean {
    return Boolean(this.registrationForm.get(controlName)?.valid);
  }

  validationClass(controlName: string): any {
    return {
      'is-invalid': this.isFieldInvalid(controlName),
      'is-valid': this.isFieldValid(controlName),
    };
  }

  hasErrors(controlName: string): boolean {
    return Boolean(this.registrationForm.get(controlName)?.errors);
  }

  allErrors(controlName: string): string[] {
    const control = this.registrationForm.get(controlName);
    if (control) {
      if (control?.errors) {
        return Object.keys(control.errors);
      }
    }
    return [];
  }

  getError(controlName: string, error: string): string {
    // @ts-ignore
    return this.validationErrors[controlName][error];
  }

  onSubmit(): void {
    this.userService.register({
      username: this.registrationForm.controls.username.value,
      password: this.registrationForm.controls.password.value,
      matchingPassword: this.registrationForm.controls.matchingPassword.value,
      phone: this.registrationForm.controls.phone.value,
      email: this.registrationForm.controls.email.value,
      familyName: this.registrationForm.controls.familyName.value,
      givenName: this.registrationForm.controls.givenName.value,
    });
  }
}
