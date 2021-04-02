import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/CartItem';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  constructor() {
    this.loadCart();
  }

  loadCart(): void {
    const cartString = localStorage.getItem(CART_KEY);
    if (cartString) {
      this.cartItems = JSON.parse(cartString);
    }
  }

  saveCart(): void {
    const cartString = JSON.stringify(this.cartItems);
    localStorage.setItem(CART_KEY, cartString);
  }

  cartContains(cartItem: CartItem): boolean {
    return this.cartItems.find((item) => item.id === cartItem.id) !== undefined;
  }

  addToCart(cartItem: CartItem): void {
    if (!this.cartContains(cartItem)) {
      this.cartItems.push(cartItem);
      this.saveCart();
    }
  }

  removeFromCart(cartItem: CartItem): void {
    if (this.cartContains(cartItem)) {
      this.cartItems = this.cartItems.filter((c) => c.id !== cartItem.id);
      this.saveCart();
    }
  }

  get cartLength(): number {
    return this.cartItems.length;
  }
}
