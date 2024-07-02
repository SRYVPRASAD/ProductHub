import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnChanges {
  @Input() products: Product[] = [];
  tempProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      // Create copies of the products for temporary editing
      this.tempProducts = this.products.map((product) => ({ ...product }));
    }
  }

  applyChanges() {
    // Update the actual products using the ProductService
    this.tempProducts.forEach((tempProduct) =>
      this.productService.updateProduct(tempProduct)
    );
  }
}
