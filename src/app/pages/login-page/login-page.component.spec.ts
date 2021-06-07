import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { LoginFormComponent } from '../../components/authentication/login-form/login-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoadingButtonComponent } from '../../components/loading-button/loading-button.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginPageComponent,
        LoginFormComponent,
        LoadingButtonComponent,
      ],
      providers: [FormBuilder],
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display LoginFormComponent', () => {
    const de = fixture.debugElement.query(By.directive(LoginFormComponent));
    expect(de).toBeTruthy();
  });
});
