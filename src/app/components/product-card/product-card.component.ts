// product-card.component.ts
import { Component, Input } from '@angular/core';
import { Product } from '../../product.model';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart({ product: this.product, quantity: 1 });
  }
}


