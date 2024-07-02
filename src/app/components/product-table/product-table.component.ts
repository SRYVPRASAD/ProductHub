import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
})
export class ProductTableComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: Product[] = [];

  displayedColumns: string[] = ['select', 'name', 'price', 'description']; // Define displayed columns

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.productService.selectedProducts$.subscribe(
      (products) => (this.selectedProducts = products)
    );
    this.productService.products$.subscribe(
      (products) => (this.products = products)
    ); // Subscribe to product updates
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  selectProduct(product: Product) {
    this.productService.selectProduct(product);
  }

  unselectProduct(product: Product) {
    this.productService.unselectProduct(product);
  }

  isSelected(product: Product): boolean {
    return this.selectedProducts.some((p) => p.id === product.id);
  }
}
