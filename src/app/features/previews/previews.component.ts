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
import { SafePipe } from '@shared/pipes/safe.pipe';
import { supabaseAdmin } from '@shared/libs/supabase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previews',
  standalone: true,
  imports: [CurrencyPipe, SafePipe],
  templateUrl: './previews.component.html',
  styleUrl: './previews.component.css',
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
    payment_state: '',
    payment_attempt_number: 0,
    // state_payment: 0,
    // path: '',
    model_id: '',
    model_composition: '',
    model_title: '',
    model_image: '',
    model_price: 0,
    model_total_messages: 0,
    model_total_images: 0,
    // messages: null,
    // images: null,
    video_rendered_url: '',
    video_rendered_url_with_watermark: '',
  };
  order = signal<Order | undefined>(this.entity_blank);

  private readonly ordersSvc = inject(OrdersService);
  private readonly _checkoutSvc = inject(CheckoutService);

  constructor(private router: Router) { }

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
      // console.log('res', res)
      if (res) {
        this.order.set(res);
      }
      else {
        //TODO: tal vez mostrar página con aviso de error
        this.router.navigateByUrl('/categories');
      }
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
    const data = payload.new;
    //setear valor sólo si hay cambio de estado.

    if (data.is_current && !data.is_deleted) {

      if (this.order()?.order_state != data.order_state)
        this.order.set(data);
    }

    // this.order = payload.new;

    // this.order = this.ordersSvc.getOrderById(this.orderId());
  }

  onProceedToPay(): void {

    console.log(this.order()?.model_title);
    console.log(this.order()?.model_image);

    const id = this.orderId();
    const items: ProductCheckout[] = [{
      title: this.order()?.model_title,
      image: this.order()?.model_image,
      // title: "Bob Esponja 1",
      // image: "https://blijhwisxhocmojszgoy.supabase.co/storage/v1/object/sign/images-products/bob-esponja.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvYm9iLWVzcG9uamEuanBnIiwiaWF0IjoxNzE0NzA4MjU0LCJleHAiOjE3MTUzMTMwNTR9.a8OJ031qLLmn7Bk8Sc2LpAIipn4se6UwJa95UPA2gEE&t=2024-05-03T03%3A50%3A51.020Z",
      price: this.order()?.model_price,
    }]

    this._checkoutSvc.onProceedToPay(id, items);
  }
}
