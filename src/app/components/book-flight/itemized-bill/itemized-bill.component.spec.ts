import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemizedBillComponent } from './itemized-bill.component';

describe('ItemizedBillComponent', () => {
  let component: ItemizedBillComponent;
  let fixture: ComponentFixture<ItemizedBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemizedBillComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemizedBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
