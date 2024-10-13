import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'shopping_cart';
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem(this.cartKey);
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  private saveCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(item: CartItem): void {
        const existingItem = this.cartItems.find(i => i.product.id === item.product.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
          } else {
              this.cartItems.push(item);
          }
    this.saveCart();
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}
