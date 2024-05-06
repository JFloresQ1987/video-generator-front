import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CartStore } from '@shared/store/shopping-cart.store';
import { Product } from '@shared/models/product.interface';
import { CategoriesService } from '@api/categories.service';
import { Category } from '@shared/models/category.interface';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CardComponent],
  template: `
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-5 mx-auto">
        <div class="flex flex-wrap -m-4">
          @for (category of categories(); track $index) {
          <app-card
            (addToCartEvent)="onAddToCart($event)"
            class="w-full p-4 lg:w-1/4 md:w-1/2"
            [category]="category"
          />
          }
        </div>
      </div>
    </section>
  `,
})
export default class CategoriesComponent {
  private readonly categorySvc = inject(CategoriesService);
  categories = this.categorySvc.categories;
  cartStore = inject(CartStore);

  onAddToCart(category: Category): void {
    // this.cartStore.addToCart(category);
  }
}
