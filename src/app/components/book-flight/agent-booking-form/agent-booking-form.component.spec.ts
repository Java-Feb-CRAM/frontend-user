import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentBookingFormComponent } from './agent-booking-form.component';

describe('AgentBookingFormComponent', () => {
  let component: AgentBookingFormComponent;
  let fixture: ComponentFixture<AgentBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentBookingFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
