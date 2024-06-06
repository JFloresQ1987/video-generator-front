import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment';
import { ProductCheckout } from '@shared/models/product.interface';
import { map } from 'rxjs';
import Config from '../../assets/config.json'
// import Config from '@envs/config.json'
// import Config from '../../config.json'

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private readonly _http = inject(HttpClient);
  // private readonly _endPoint = environment.apiURL;
  private readonly _endPoint = environment.production ? Config.apiURL : environment.apiURL;
  // private readonly _url = environment.serverURL;

  onProceedToPay(id: string, products: ProductCheckout[]) {    

    return this._http      
      .post(`${this._endPoint}/create-checkout-session`, { id: id, items: products })
      .pipe(
        map(async (res: any) => {
          window.location.href = res.url;
        })
      )
      .subscribe({
        error: (err) => console.error('Error', err),
      });
  }
}
