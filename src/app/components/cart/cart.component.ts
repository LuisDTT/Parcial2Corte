// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../cart-item.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
    });
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}

