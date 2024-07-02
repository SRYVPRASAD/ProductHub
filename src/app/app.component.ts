import { Component } from '@angular/core';
import { ProductService, Product } from './services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  selectedProducts$: any | Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.selectedProducts$ = this.productService.selectedProducts$;
  }
}
