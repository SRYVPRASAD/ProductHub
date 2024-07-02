import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  selectedProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.selectedProducts$.subscribe(
      (products) => (this.selectedProducts = products)
    );
  }

  unselectProduct(product: Product) {
    this.productService.unselectProduct(product);
  }
}
