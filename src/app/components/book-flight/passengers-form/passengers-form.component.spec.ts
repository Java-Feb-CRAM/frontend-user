import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersFormComponent } from './passengers-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('PassengersFormComponent', () => {
  let component: PassengersFormComponent;
  let fixture: ComponentFixture<PassengersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, NgbModule],
      declarations: [PassengersFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
