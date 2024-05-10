import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Signal, inject, input, signal } from '@angular/core';
import { ModelsService } from '@api/models.service';
import { OrdersService } from '@api/orders.service';
import { CheckoutService } from '@api/checkout.service';
import SpinnerComponent from '@shared/components/spinner.component';
import { Model } from '@shared/models/model.interface';
import { Order } from '@shared/models/order.interface';
import { Product, ProductCheckout } from '@shared/models/product.interface';
import { SpinnerService } from '@shared/services/spinner.service';
import { SafePipe } from 'app/common/pipe/safe.pipe';
import { supabaseAdmin } from 'app/libs/supabase';

@Component({
  selector: 'app-previews',
  standalone: true,
  imports: [CurrencyPipe, SafePipe],
  templateUrl: './previews.component.html'
})
export default class PreviewsComponent implements OnInit {

  progress: string = 'width: 10%';
  // order_state: string = 'Creando';
  orderId = input<string>('', { alias: 'id' });
  // order!: Signal<Order | undefined>;

  entity_blank: Order = {
    id: '',
    // tematic: '',
    order_state: '',
    // state_payment: 0,
    // path: '',
    model_id: '',
    model_composition: '',
    model_price: 0,
    // messages: null,
    // images: null,
    video_rendered_url: '',
  };
  order = signal<Order | undefined>(this.entity_blank);

  private readonly ordersSvc = inject(OrdersService);
  private readonly _checkoutSvc = inject(CheckoutService);

  // entity_blank: Order = {
  //   // id: '',
  //   // tematic: '',
  //   // state: 0,
  //   // state_payment: 0,
  //   // path: '',
  //   model_id: '',
  //   model_composition: '',
  //   // messages: null,
  //   // images: null,
  //   video_rendered_url: '',
  // };

  // // production = signal<Order | undefined>(this.entity_blank);

  // production: Order | undefined= this.entity_blank;

  // entity_blank: Order = {
  //   // id: '',
  //   // tematic: '',
  //   order_state: "created",
  //   // state_payment: 0,
  //   // path: '',
  //   model_id: '',
  //   model_composition: '',
  //   // messages: null,
  //   // images: null,
  //   video_rendered_url: '',
  // };
  // production = signal<Order | undefined>(this.entity_blank);

  // private readonly modelsSvc = inject(ModelsService);
  // // product!: Signal<Product | undefined>;
  // models!: Signal<Model[] | undefined>;
  // // // async ngOnInit(): Promise<void> {



  ngOnInit(): void {

    // this.order = this.ordersSvc.getOrderById(this.orderId());
   
    this.ordersSvc.getOrderById(this.orderId()).subscribe((res: any) => {
      // this.service.getUsuario(id).subscribe(res => {
      // console.log(res)  
      this.order.set(res);
      // console.log(res['usuario'])

    });

    supabaseAdmin
      .channel('todos')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${this.orderId()}`
        },
        (payload: any) => {
          this.handleUpdates(payload);
        }
      )
      .subscribe()
  }

  // handleUpdates(payload: any): void {
  handleUpdates(payload: any) {
    // this.production.set(payload.new);
    this.order.set(payload.new);
    // this.order = payload.new;

    // this.order = this.ordersSvc.getOrderById(this.orderId());
  }

  onProceedToPay(): void {

    const id = this.orderId();
    const items: ProductCheckout[] = [{
      // title: this.order()?.title,
      // image: this.order()?.image,
      title: "Bob Esponja 1",
      image: "https://blijhwisxhocmojszgoy.supabase.co/storage/v1/object/sign/images-products/bob-esponja.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvYm9iLWVzcG9uamEuanBnIiwiaWF0IjoxNzE0NzA4MjU0LCJleHAiOjE3MTUzMTMwNTR9.a8OJ031qLLmn7Bk8Sc2LpAIipn4se6UwJa95UPA2gEE&t=2024-05-03T03%3A50%3A51.020Z",
      price: this.order()?.model_price,
    }]

    this._checkoutSvc.onProceedToPay(id, items);
  }
}
