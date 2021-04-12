import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsPageComponent } from './flights-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('FlightsPageComponent', () => {
  let component: FlightsPageComponent;
  let fixture: ComponentFixture<FlightsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [FlightsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
