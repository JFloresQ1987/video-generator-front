import { HttpClient } from '@angular/common/http';
import {
    EnvironmentInjector,
    Injectable,
    inject,
    signal,
} from '@angular/core';
import { environment } from '@envs/environment';
import { runtimeEnvironment } from '@envs/runtimeEnvironment';
import { Model } from '@shared/models/model.interface';
import { NewOrder, Order, UpdatedOrder } from '@shared/models/order.interface';
// import Config from '../../assets/config.json'
// import Config from '@envs/config.json'
// import Config from '../../config.json'

@Injectable({ providedIn: 'root' })
export class OrdersService {
    public models = signal<Model[]>([]);
    private readonly _http = inject(HttpClient);    
    private readonly _endPoint = environment.production ? runtimeEnvironment.API_URL : environment.API_URL;
    // private readonly _endPoint = environment.production ? Config.API_URL : environment.API_URL;
    // private readonly _endPoint = environment.API_URL;    
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
