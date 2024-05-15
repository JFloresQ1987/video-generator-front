import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '@api/orders.service';
import { CheckoutService } from '@api/checkout.service';
import { Order } from '@shared/models/order.interface';
import { SafePipe } from '@shared/pipes/safe.pipe';
import { supabaseAdmin } from '@shared/libs/supabase';
// import { Resend } from 'resend';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [SafePipe, RouterLink],
  templateUrl: './sales.component.html'
})
export default class SalesComponent {

  // private readonly _checkoutSvc = inject(CheckoutService);
  // private readonly resend = new Resend("re_fDEv2cRc_9hn5Xzmh72v8EBqa4vHw64Le");

  entity_blank: Order = {
    id: '',
    // tematic: '',
    order_state: '',
    payment_state: '',
    // state_payment: 0,
    // path: '',
    model_id: '',
    model_composition: '',
    model_price: 0,
    // messages: null,
    // images: null,
    video_rendered_url: '',
    video_rendered_url_with_watermark: '',
  };
  order = signal<Order | undefined>(this.entity_blank);

  orderId = input<string>('', { alias: 'id' });

  private readonly ordersSvc = inject(OrdersService);

  constructor(private router: Router) { }
  // private readonly _checkoutSvc = inject(CheckoutService);

  // state_222: any

  // constructor() {

  //   // console.log('entro a constructor')
  //   // this.getProfile('5e4ecd7e-fa7d-42dc-bda8-6ef793d37354');
  // }

  ngOnInit(): void {

    // this.order = this.ordersSvc.getOrderById(this.orderId());

    this.ordersSvc.getOrderById(this.orderId()).subscribe((res: any) => {
      // this.service.getUsuario(id).subscribe(res => {
      // console.log(res)  
      if (res) {

        // if (res.order_state == "produced" || res.order_state == "edited") {
        if (res.payment_state == "paid") {
          this.order.set(res);
        } else {
          //TODO: tal vez mostrar página con aviso de error, porque no fue pagado
          // this.router.navigateByUrl('/previews/');
          this.router.navigateByUrl(`/previews/${res.id}`);
          // this.router.navigateByUrl(`/previews/${res.data.id}`);
        }
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
          // console.log(payload)
          this.handleUpdates(payload);
        }
      )
      .subscribe()
  }

  handleUpdates(payload: any) {
    // this.production.set(payload.new);
    this.order.set(payload.new);
    // this.order = payload.new;

    // this.order = this.ordersSvc.getOrderById(this.orderId());
  }

  // async getProfile(id: string) {
  //   try {

  //     console.log('entroooo')

  //     let { data, error } = await supabaseAdmin
  //       // .from('produtcs')
  //       // .select(id)
  //       .from('production')
  //       .select()
  //       .eq('id', id)
  //       .single()

  //     // console.log('entro a single22')
  //     console.log('entro a 11');
  //     console.log(data);

  //     // this.product = data;
  //     this.production.set(data);

  //     // const dattaa = this._checkoutSvc.getSessionPaymentById(data.session_id).subscribe(async (result: any) => {

  //     //   if (result) {
  //     //     this.state_222 = result;
  //     //     console.log(result)

  //     //     if (result.status == 'expired') {

  //     //       console.log('entro a completar estado de venta')
  //     //       console.log(data.id)

  //     //       supabaseAdmin
  //     //         .from('production')
  //     //         .upsert({
  //     //           id: data.id,
  //     //           state_payment: 1,
  //     //         })

  //     //       console.log('Entro a enviar correo')

  //     //       // // const { data, error } = await resend.emails.send({
  //     //       //   await this.resend.emails.send({
  //     //       //   from: "Dev Jorge <jfloresq1987@gmail.com>",
  //     //       //   to: ["jfloresq1987@gmail.com"],
  //     //       //   subject: "hello world",
  //     //       //   html: "<strong>it works!</strong>",
  //     //       // });


  //     //       // if (data) console.log(data)
  //     //       // if (error) console.log(error)
  //     //     }

  //     //     return result;
  //     //   }
  //     // },
  //     //   (error: any) => { });

  //     // console.log('entro a 22');
  //     // console.log(dattaa);
  //     // console.log(this.state_222);

  //     // if (data) return data
  //     // if (error) console.log(error)

  //     // this.loading = true
  //     // const { user } = this.session
  //     // const { data: profile, error, status } = await this.supabase.profile(user)

  //     // if (error && status !== 406) {
  //     //   throw error
  //     // }

  //     // if (profile) {
  //     //   this.profile = profile
  //     // }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       alert(error.message)
  //     }
  //   } finally {
  //     // this.loading = false
  //   }
  // }

  // onProceedToPay(): void {
  //   console.log('entroo a editar video');
  //   // this._checkoutSvc.onProceedToPay();
  //   // this._checkoutSvc.onProceedToPay(this.cartStore.products());
  // }

}
