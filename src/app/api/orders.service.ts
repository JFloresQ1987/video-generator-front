import { HttpClient } from '@angular/common/http';
import {
    EnvironmentInjector,
    Injectable,
    inject,
    signal,
} from '@angular/core';
import { environment } from '@envs/environment';
import { Model } from '@shared/models/model.interface';
import { NewOrder, Order, UpdatedOrder } from '@shared/models/order.interface';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    public models = signal<Model[]>([]);
    private readonly _http = inject(HttpClient);    
    private readonly _endPoint = environment.apiURL;    
    private readonly _injector = inject(EnvironmentInjector);

    constructor() {
        // this.getProducts();
    }

    crear(entity: NewOrder) {        
        
        console.log('entro a API')
        console.log(entity)
        
        const url = `${this._endPoint}/orders`;
        return this._http.post(url, entity);
    }

    editar(entity: UpdatedOrder) {        
        const url = `${this._endPoint}/orders`;
        return this._http.put(url, entity);
    }

    getOrderById(id: string) {
        const url = `${this._endPoint}/order-by-id/${id}`;
        return this._http.get(url);
    }
}
