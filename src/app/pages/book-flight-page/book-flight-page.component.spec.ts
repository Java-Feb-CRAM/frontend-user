import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFlightPageComponent } from './book-flight-page.component';

describe('BookFlightPageComponent', () => {
  let component: BookFlightPageComponent;
  let fixture: ComponentFixture<BookFlightPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookFlightPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFlightPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
