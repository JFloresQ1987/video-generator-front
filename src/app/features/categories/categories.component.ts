import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CategoriesService } from '@api/categories.service';

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
  //TODO: cambiar la llamada a listar todos las categorias
  private readonly categorySvc = inject(CategoriesService);
  categories = this.categorySvc.categories;
}
