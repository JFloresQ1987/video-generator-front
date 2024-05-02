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
import { supabase } from 'app/libs/supabase';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  public products = signal<Product[]>([]);
  private readonly _http = inject(HttpClient);
  // private readonly _supabase = inject(supabase);
  private readonly _endPoint = environment.apiURL;
  private readonly _injector = inject(EnvironmentInjector);

  constructor() {
    this.getProducts();
  }

  public async getProducts(): Promise<void> {
    // this._http
    //   .get<Product[]>(`${this._endPoint}/products/?sort=desc`)
    //   .pipe(
    //     map((products: Product[]) =>
    //       products.map((product: Product) => ({ ...product, qty: 1 }))
    //     ),
    //     tap((products: Product[]) => this.products.set(products))
    //   )
    //   .subscribe();

    let { data, error } = await supabase
      .from('produtcs')
      .select('*')

    if (data) this.products.set(data);
    if (error) console.log(error)
  }

  public async getProductById2(id: string): Promise<any> {
    let { data, error } = await supabase
      // .from('produtcs')
      // .select(id)
      .from('produtcs')
      .select()
      .eq('id', id)
      .single()

    console.log('entro a single')
      console.log(data);

    if (data) return data
    if (error) console.log(error)
  }

  // public async getProductById(id: number) {
  public getProductById(id: string) {

    // return supabase
    //   .from('produtcs')
    //   .select()
    //   .eq('id', id)
    //   .single()

    return runInInjectionContext(this._injector, async () =>
      toSignal<Product>(
        // this._http.get<Product>(`${this._endPoint}/products/${id}`)
       
          await this.getProductById2(id)

          // console.log('entroooo')
       
          // .then((result: any) => {
          //   // this.product =  value;
          //   // console.log('222222')
          //   // console.log(this.product)
          //   // console.log(str); // 👉️ "bobbyhadz.com"
          //   return result;
          // })
        // data
      )
    );

    // const x = runInInjectionContext(this._injector, () =>
    //   toSignal<Product>(
    //     this._http.get<Product>(`${this._endPoint}/products/${id}`)
    //     // data
    //   )
    // );

    // console.log(data)

    // // let { data, error } = await supabase
    // //   .from('produtcs')
    // //   .select(id)

    // if (data) return data
    // if (error) console.log(error)

    // return data

  }
}
