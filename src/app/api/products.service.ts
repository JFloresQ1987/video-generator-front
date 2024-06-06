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
import { Product } from '@shared/models/product.interface';
import Config from '@envs/config.json'
// import Config from '../../config.json'

@Injectable({ providedIn: 'root' })
export class ProductsService {
  public products = signal<Product[]>([]);
  private readonly _http = inject(HttpClient);  
  private readonly _endPoint = environment.production ? Config.apiURL : environment.apiURL;
  // private readonly _endPoint = environment.apiURL;
  private readonly _injector = inject(EnvironmentInjector);

  constructor() {
    // this.getProducts();
  }

  public getProductsByCategory(category_id: string) {
    return runInInjectionContext(this._injector, () =>
      toSignal<Product[]>(
        this._http.get<Product[]>(`${this._endPoint}/products-by-category/${category_id}`)
      //   .subscribe((res: any) => {
      //     this.categories.set(res.data);
      // });
      )
    );
  }

  public getProductById(id: string) {
    return runInInjectionContext(this._injector, () =>
      toSignal<Product>(
        this._http.get<Product>(`${this._endPoint}/product-by-id/${id}`)
      //   .subscribe((res: any) => {
      //     this.categories.set(res.data);
      // });
      )
    );
  }
}
