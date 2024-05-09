import { HttpClient } from '@angular/common/http';
import {
    EnvironmentInjector,
    Injectable,
    inject,
    runInInjectionContext,
    signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '@envs/environment';
import { Model } from '@shared/models/model.interface';
import { NewOrder, Order } from '@shared/models/order.interface';
import { Product } from '@shared/models/product.interface';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    public models = signal<Model[]>([]);
    private readonly _http = inject(HttpClient);
    // private readonly _supabase = inject(supabase);
    private readonly _endPoint = environment.apiURL;
    // private readonly _endPoint2 = environment.apiURL2;
    private readonly _injector = inject(EnvironmentInjector);

    constructor() {
        // this.getProducts();
    }

    crear(entity: NewOrder) {
        // const url = `${base_url}/analistas`;
        const url = `${this._endPoint}/orders`;
        return this._http.post(url, entity);
    }

    editar(entity: Order) {
        // const url = `${base_url}/analistas`;
        const url = `${this._endPoint}/orders`;
        return this._http.put(url, entity);
    }

    // public getModelsByProduct(product_id: string) {
    //     return runInInjectionContext(this._injector, () =>
    //         toSignal<Model[]>(
    //             this._http.get<Model[]>(`${this._endPoint}/models-by-product/${product_id}`)
    //             //   .subscribe((res: any) => {
    //             //     this.categories.set(res.data);
    //             // });
    //         )
    //     );
    // }

    // public getOrderById(id: string) {
    //     return runInInjectionContext(this._injector, () =>
    //         toSignal<Order>(
    //             this._http.get<Order>(`${this._endPoint}/order-by-id/${id}`)
    //             //   .subscribe((res: any) => {
    //             //     this.categories.set(res.data);
    //             // });
    //         )
    //     );
    // }

    getOrderById(id: string) {
        const url = `${this._endPoint}/order-by-id/${id}`;
        return this._http.get(url);
      }

    // public getProductById(id: number) {
    //     return runInInjectionContext(this._injector, () =>
    //       toSignal<Product>(
    //         this._http.get<Product>(`${this._endPoint2}/products/${id}`)
    //       )
    //     );
    //   }
}
