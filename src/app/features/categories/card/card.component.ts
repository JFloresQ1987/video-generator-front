import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '@shared/models/category.interface';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe, RouterLink],
  templateUrl: './card.component.html',  
})
export class CardComponent {
  category = input.required<Category>();
  // @Output() addToCartEvent = new EventEmitter<Category>();

  // onAddToCart(): void {
  //   // this.addToCartEvent.emit(this.category());
  // }
}
