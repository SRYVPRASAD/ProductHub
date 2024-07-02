import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  // add more fields as necessary
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', price: 100, description: 'Description 1' },
    { id: 2, name: 'Product 2', price: 200, description: 'Description 2' },
    // add more products
  ];

  private selectedProducts = new BehaviorSubject<Product[]>([]);
  selectedProducts$ = this.selectedProducts.asObservable();

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();

  getProducts() {
    return [...this.products];
  }

  selectProduct(product: Product) {
    const currentSelection = this.selectedProducts.getValue();
    if (!currentSelection.some((p) => p.id === product.id)) {
      this.selectedProducts.next([...currentSelection, product]);
    }
  }

  unselectProduct(product: Product) {
    const currentSelection = this.selectedProducts
      .getValue()
      .filter((p) => p.id !== product.id);
    this.selectedProducts.next(currentSelection);
  }

  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index > -1) {
      this.products[index] = { ...updatedProduct };
      this.productsSubject.next([...this.products]); // Emit updated products list
    }
  }
}
