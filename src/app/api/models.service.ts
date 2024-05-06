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
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModelsService {
    public models = signal<Model[]>([]);
    private readonly _http = inject(HttpClient);
    // private readonly _supabase = inject(supabase);
    private readonly _endPoint = environment.apiURL;
    private readonly _injector = inject(EnvironmentInjector);

    constructor() {
        // this.getProducts();
    }   

    public getModelsByProduct(product_id: string) {
        return runInInjectionContext(this._injector, () =>
            toSignal<Model[]>(
                this._http.get<Model[]>(`${this._endPoint}/models-by-product/${product_id}`)
                //   .subscribe((res: any) => {
                //     this.categories.set(res.data);
                // });
            )
        );
    }

    public getModelById(id: string) {
        return runInInjectionContext(this._injector, () =>
            toSignal<Model>(
                this._http.get<Model>(`${this._endPoint}/model-by-id/${id}`)
                //   .subscribe((res: any) => {
                //     this.categories.set(res.data);
                // });
            )
        );
    }
}
