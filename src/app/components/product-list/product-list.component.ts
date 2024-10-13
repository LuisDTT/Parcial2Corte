import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  loadCategories() {
    this.productService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
    console.log(this.categories)
  }

  onCategoryChange() {
    if (this.selectedCategory) {
      
      this.productService.getProductsByCategory(this.selectedCategory).subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching products by category', error);
        }
      );
    } else {
      this.loadProducts();
      console.log('no category')
    }
  }
}
