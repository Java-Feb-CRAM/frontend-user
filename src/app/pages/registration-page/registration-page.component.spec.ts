import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPageComponent } from './registration-page.component';
import { RegistrationFormComponent } from '../../components/authentication/registration-form/registration-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { PhonePipe } from '../../pipes/phone.pipe';
import { LoadingButtonComponent } from '../../components/loading-button/loading-button.component';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegistrationPageComponent,
        RegistrationFormComponent,
        PhonePipe,
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
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display RegistrationFormComponent', () => {
    const de = fixture.debugElement.query(
      By.directive(RegistrationFormComponent)
    );
    expect(de).toBeTruthy();
  });
});
