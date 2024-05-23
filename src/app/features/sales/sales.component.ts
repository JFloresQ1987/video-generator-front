import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '@api/orders.service';
import { Order } from '@shared/models/order.interface';
import { SafePipe } from '@shared/pipes/safe.pipe';
import { supabaseAdmin } from '@shared/libs/supabase';
// import { Resend } from 'resend';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [SafePipe, RouterLink],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export default class SalesComponent {
  
  // private readonly resend = new Resend("re_fDEv2cRc_9hn5Xzmh72v8EBqa4vHw64Le");

  entity_blank: Order = {
    id: '',
    order_state: '',
    payment_state: '',
    payment_attempt_number: 0,
    model_id: '',
    model_composition: '',
    model_title: '',
    model_image: '',
    model_price: 0,
    video_rendered_url: '',
    video_rendered_url_with_watermark: '',
  };
  order = signal<Order | undefined>(this.entity_blank);

  orderId = input<string>('', { alias: 'id' });

  private readonly ordersSvc = inject(OrdersService);

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.ordersSvc.getOrderById(this.orderId()).subscribe((res: any) => {

      if (res) {

        if (res.payment_state == "paid") {
          this.order.set(res);
        } else {
          //TODO: tal vez mostrar página con aviso de error, porque no fue pagado
          this.router.navigateByUrl(`/previews/${res.id}`);
        }
      }
      else {
        //TODO: tal vez mostrar página con aviso de error
        this.router.navigateByUrl('/categories');
      }
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

  handleUpdates(payload: any) {
    this.order.set(payload.new);
  }  

  //     //       console.log('Entro a enviar correo')

  //     //       // // const { data, error } = await resend.emails.send({
  //     //       //   await this.resend.emails.send({
  //     //       //   from: "Dev Jorge <jfloresq1987@gmail.com>",
  //     //       //   to: ["jfloresq1987@gmail.com"],
  //     //       //   subject: "hello world",
  //     //       //   html: "<strong>it works!</strong>",
  //     //       // });
}
