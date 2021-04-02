import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

export interface LoginFormData {
  username?: String;
  password?: String;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output()
  loginFormSubmitEvent = new EventEmitter<LoginFormData>();
  loginForm: FormGroup;
  validationErrors = {
    username: {
      required: 'Username is required',
      minLength: 'Username must be a minimum of 8 characters',
      maxLength: 'Username must be a maximum of 32 characters',
      pattern: 'Username can only have lowercase/uppercase letters, numbers and underscores',
    },
    password: {
      required: 'Password is required',
      minLength: 'Password must be a minimum of 8 characters',
      maxLength: 'Password must be a maximum of 32 characters',
      pattern: 'Password must contain:\n 1 uppercase letter\n'+
      '1 lowercase letter\n 1 number\n 1 of these symbols: @!#$%^&*_+=~',
    },
  };

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.userService.checkRedirect()
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern("^[a-zA-Z]+[a-zA-Z\\d_]+$"),
        ],
      ],
      password: [
        '', 
        [
          Validators.required, 
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern("[A-Za-z\\d@!#$%^&*_+=~]+$"),
        ],
      ],
    })
  }

  isFieldInvalid(controlName: string): boolean {
    return Boolean(
      this.loginForm.get(controlName)?.invalid &&
        (this.loginForm.get(controlName)?.dirty ||
          this.loginForm.get(controlName)?.touched)
    );
  }

  isFieldValid(controlName: string): boolean {
    return Boolean(this.loginForm.get(controlName)?.valid);
  }

  validationClass(controlName: string): any {
    return {
      'is-invalid': this.isFieldInvalid(controlName),
      'is-valid': this.isFieldValid(controlName),
    };
  }

  hasErrors(controlName: string): boolean {
    return Boolean(this.loginForm.get(controlName)?.errors);
  }

  allErrors(controlName: string): string[] {
    // tslint:disable-next-line:no-non-null-assertion
    return Object.keys(this.loginForm.get(controlName)!.errors!);
  }

  getError(controlName: string, error: string): string {
    // @ts-ignore
    return this.validationErrors[controlName][error];
  }

  onSubmit(): void {
    this.userService.login({
      "username": this.loginForm.controls.username.value, 
      "password": this.loginForm.controls.password.value
    });
  }
}