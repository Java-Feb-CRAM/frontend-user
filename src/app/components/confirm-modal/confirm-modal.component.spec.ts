import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { ConfirmModalComponent } from './confirm-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

class NgbActiveModalStub {
  close(result?: any): void {}
}

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmModalComponent],
      providers: [
        {
          provide: NgbActiveModal,
          useClass: NgbActiveModalStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the title', () => {
    component.title = 'Testing 123';
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.modal-title'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Testing 123');
  });

  it('should display the message', () => {
    component.message = 'My message';
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.modal-body > p'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('My message');
  });

  it('should close with cancel when clicking on cancel', () => {
    const modal = TestBed.get(NgbActiveModal);
    const spy = spyOn(modal, 'close');
    const de = fixture.debugElement.query(By.css('.btn-secondary'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith('cancel');
  });

  it('should close with delete when clicking on yes', () => {
    const modal = TestBed.get(NgbActiveModal);
    const spy = spyOn(modal, 'close');
    const de = fixture.debugElement.query(By.css('.btn-danger'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith('delete');
  });
});
