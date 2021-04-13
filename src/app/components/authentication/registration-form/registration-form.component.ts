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
        'Username can only have lowercase/uppercase letters, numbers and underscores',
    },
    password: {
      required: 'Password is required',
      minLength: 'Password must be a minimum of 8 characters',
      maxLength: 'Password must be a maximum of 32 characters',
      pattern:
        'Password must contain: 1 uppercase letter' +
        '1 lowercase letter 1 number 1 of these symbols: @!#$%^&*_+=~',
    },
    email: {
      required: 'Email is required',
      email: 'Email must be a valid email',
    },
    phone: {
      required: 'Phone number is required',
      pattern: 'Phone number must follow pattern 000-111-2222',
    },
    givenName: {
      required: 'First name is required',
      minLength: 'First name must be a minimum of 1 characters',
      maxLength: 'First name must be a maximum of 32 characters',
    },
    familyName: {
      required: 'Last name is required',
      minLength: 'Last name must be a minimum of 1 characters',
      maxLength: 'Last name must be a maximum of 32 characters',
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
          Validators.pattern('^[a-zA-Z]+[a-zA-Z\\d_]+$'),
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
      matchingPassword: ['', []],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(16),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      familyName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(32),
        ],
      ],
      givenName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(32),
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
    if (this.registrationForm.get(controlName)) {
      const control = this.registrationForm.get(controlName);
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
