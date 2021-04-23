import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { UserService } from '../../../services/user.service';
import { CartService } from '../../../services/cart.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [UserService, CartService],
      imports: [RouterModule.forRoot([]), HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should display links', () => {
    component.links = [
      {
        to: 'abc',
        name: 'ABC',
      },
      {
        to: 'def',
        name: 'DEF',
      },
    ];
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.nav-link'));
    expect(de[0].nativeElement.innerText).toContain('ABC');
    expect(de[1].nativeElement.innerText).toContain('DEF');
    expect(de[0].properties['href']).toContain('abc');
    expect(de[1].properties['href']).toContain('def');
  });

  it('should display the users name if logged in', () => {
    const userService: UserService = TestBed.get(UserService);
    userService.isLoggedIn = true;
    userService.user = {
      givenName: 'Joe',
    };
    fixture.detectChanges();
    const de = fixture.debugElement.query(
      By.css('.navbar-right > .text-white')
    );
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Joe');
  });

  it('should display a logout button if logged in', () => {
    const userService: UserService = TestBed.get(UserService);
    userService.isLoggedIn = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(
      By.css('.navbar-right > .btn-primary')
    );
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Log Out');
  });

  it('should display a sign up button if logged out', () => {
    const userService: UserService = TestBed.get(UserService);
    userService.isLoggedIn = false;
    fixture.detectChanges();
    const de = fixture.debugElement.query(
      By.css('.navbar-right > .btn-primary')
    );
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Sign Up');
  });

  it('should log out the user if clicking logout', () => {
    const userService: UserService = TestBed.get(UserService);
    userService.isLoggedIn = true;
    const spy = spyOn(userService, 'logout');
    fixture.detectChanges();
    const de = fixture.debugElement.query(
      By.css('.navbar-right > .btn-primary')
    );
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalled();
  });

  it('should display the number of items in the cart', () => {
    const cartService: CartService = TestBed.get(CartService);
    cartService.cartItems.push({ id: 0 }, { id: 1 }, { id: 2 });
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.btn-primary'));
    const el: HTMLElement = de[de.length - 1].nativeElement;
    expect(el.innerText).toContain('3');
  });
});
