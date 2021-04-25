import { CART_KEY, CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.removeItem(CART_KEY);
    service = new CartService();
  });

  afterEach(() => {
    localStorage.removeItem(CART_KEY);
  });

  it('loads the cart', () => {
    const items = [{ id: 1 }, { id: 2 }];
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    service.loadCart();
    expect(service.cartItems).toEqual(items);
  });

  it('saves the cart', () => {
    service.cartItems = [{ id: 2 }, { id: 3 }];
    service.saveCart();
    const retrieved = localStorage.getItem(CART_KEY);
    expect(retrieved).toBeTruthy();
    expect(JSON.parse(retrieved!)).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('returns true if cart contains an item', () => {
    service.cartItems = [{ id: 2 }];
    const result = service.cartContains({ id: 2 });
    expect(result).toBeTrue();
  });

  it('returns false if cart does not contain an item', () => {
    service.cartItems = [{ id: 1 }];
    const result = service.cartContains({ id: 3 });
    expect(result).toBeFalse();
  });

  it('adds a new item to the cart', () => {
    service.addToCart({ id: 1 });
    expect(service.cartItems).toContain({ id: 1 });
  });

  it('does not add a duplicate item to the cart', () => {
    service.cartItems = [{ id: 1 }];
    service.addToCart({ id: 1 });
    expect(service.cartItems).toEqual([{ id: 1 }]);
  });

  it('removes an existing item from the cart', () => {
    service.cartItems = [{ id: 1 }];
    service.removeFromCart({ id: 1 });
    expect(service.cartItems).not.toContain({ id: 1 });
  });

  it('does nothing when trying to remove an item that is not in the cart', () => {
    service.cartItems = [{ id: 2 }];
    service.removeFromCart({ id: 1 });
    expect(service.cartItems).toEqual([{ id: 2 }]);
  });

  it('empties the cart', () => {
    service.cartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];
    service.emptyCart();
    expect(service.cartItems.length).toBe(0);
  });

  it('gets the carts length', () => {
    service.cartItems = [{ id: 1 }, { id: 3 }];
    expect(service.cartLength).toBe(2);
  });
});
