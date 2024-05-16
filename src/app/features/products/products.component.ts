import { Component, Signal, inject, input } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { CardComponent } from '@features/products/card/card.component';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  template: `
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-5 mx-auto">
        <div class="flex flex-wrap -m-4">
          @for (product of products(); track $index) {
          <app-card            
            class="w-full p-4 lg:w-1/4 md:w-1/2"
            [product]="product"
          />
          }
        </div>
      </div>
    </section>
  `,
})
export default class ProductsComponent {

  private readonly productsSvc = inject(ProductsService);
  categoryId = input<string>('', { alias: 'id' });
  products!: Signal<Product[] | undefined>;

  ngOnInit(): void {    

    this.products = this.productsSvc.getProductsByCategory(this.categoryId());
  }
}
