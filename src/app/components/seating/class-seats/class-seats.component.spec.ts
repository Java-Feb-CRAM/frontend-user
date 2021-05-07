import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSeatsComponent } from './class-seats.component';

describe('ClassSeatsComponent', () => {
  let component: ClassSeatsComponent;
  let fixture: ComponentFixture<ClassSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassSeatsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
