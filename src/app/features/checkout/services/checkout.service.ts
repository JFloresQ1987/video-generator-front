import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment';
import { Product } from '@shared/models/product.interface';
import { Order } from '@shared/models/order.interface';
// import { loadStripe } from '@stripe/stripe-js';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiURL;
  private readonly _url = environment.serverURL;

  // onProceedToPay(products: Product[]) {
    onProceedToPay(_id: string) {

    const ppp = [{
      // id: 'f19133e0-d2ae-4ffd-9f76-b3de859162b1',
      id: _id,
      // amount: 1000,
      // currency: 'usd',
      // paymentMethodType: 'card',
      // paymentMethod: 'pm_card_visa',
      // confirm: true
      title: 'Bob Esponja',
      image: 'https://blijhwisxhocmojszgoy.supabase.co/storage/v1/object/sign/images-products/bob-esponja.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvYm9iLWVzcG9uamEuanBnIiwiaWF0IjoxNzE0NzA4MjU0LCJleHAiOjE3MTUzMTMwNTR9.a8OJ031qLLmn7Bk8Sc2LpAIipn4se6UwJa95UPA2gEE&t=2024-05-03T03%3A50%3A51.020Z',
      price: 5,
      qty: 1,
    }]

    return this._http
      // .post(`${this._url}/checkout`, { items: products })
      .post(`${this._endPoint}/create-checkout-session`, { items: ppp })
      .pipe(
        map(async (res: any) => {
          // const stripe = await loadStripe(environment.stripeAPIKey);
          // stripe?.redirectToCheckout({ sessionId: res.id });
          console.log('devuelve stripe')
          console.log(res)
          window.location.href = res.url;
        })
      )
      .subscribe({
        error: (err) => console.error('Error', err),
      });
  }

  // getSessionPaymentById(session_id: string) {

  //   // return this._http.get<TModel>(`${this.baseUrl}${this.resourceEndpoint}/${id}`);
  //   // return this._http.get<Production>(`${this._url}/session-status/${session_id}`).subscribe();
  //   return this._http.get<Order>(`${this._url}/session-status?session_id=${session_id}`)
  //   //http://localhost:4242/session-status?session_id=cs_test_a19JsZmsAJZAQTqjlzo9k8G2Ey2UKW6f03u1T6cL1OpXrFqbn5Oy2tGkSD

  //   // return this._http
  //   //   .get(`${this._url}/session-status`, { session_id: id })
  //   //   // .pipe(
  //   //   //   map(async (res: any) => {
  //   //   //     const stripe = await loadStripe(environment.stripeAPIKey);
  //   //   //     stripe?.redirectToCheckout({ sessionId: res.id });
  //   //   //   })
  //   //   // )
  //   //   .subscribe({
  //   //     error: (err) => console.error('Error', err),
  //   //   });
  // }
}
