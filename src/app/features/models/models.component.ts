import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Signal, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ModelsService } from '@api/models.service';
import { Model } from '@shared/models/model.interface';
import { CartStore } from '@shared/store/shopping-cart.store';
import { SafePipe } from 'app/common/pipe/safe.pipe';
import { supabase } from 'app/libs/supabase';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CurrencyPipe, SafePipe, RouterLink],
  templateUrl: './models.component.html',
})
export default class ModelsComponent implements OnInit {
  starsArray: number[] = new Array(5).fill(0);

  // blanc: Model = {
  //   id: '',
  //   title: '',
  //   price: 0,
  //   category_title: '',
  //   description: '',
  //   image: '',
  //   video: '',
  //   rating: {
  //     rate: 4.5,
  //     count: 120,
  //   },
  //   qty: 0,
  //   subTotal: 0
  // };

  // // @Input({ alias: 'id' }) productId!: number;
  // productId = input<string>('', { alias: 'id' });
  // models = signal<Model | undefined>(this.blanc);
  // // product!: Signal<Product | undefined>;
  // // product!: Product | undefined;
  // // product = signal<Product | undefined>;
  // cartStore = inject(CartStore);

  // private readonly modelsSvc = inject(ModelsService);
  private readonly _sanitizer = inject(DomSanitizer);

  private readonly modelsSvc = inject(ModelsService);
  // products = this.productSvc.products;
  // cartStore = inject(CartStore);

  productId = input<string>('', { alias: 'id' });
  // category!: Signal<Category | undefined>;
  models!: Signal<Model[] | undefined>;

  // // private readonly productSvc = inject(ProductsService);
  // // products = this.productSvc.products;
  // productId = input<string>('', { alias: 'id' });
  // // category!: Signal<Category | undefined>;
  // models!: Signal<Model[] | undefined>;

  // async ngOnInit(): Promise<void> {
  //   // this.product = await this.productsSvc.getProductById(this.productId());

  //   // this.productsSvc.getProductById(this.productId()).then((value: any) => {
  //   //   this.product =  value;
  //   //   console.log('222222')
  //   //   console.log(this.product)
  //   //   // console.log(str); // 👉️ "bobbyhadz.com"
  //   // });

  //   await this.getProfile(this.productId())

  //   // const { username, website, avatar_url } = this.profile
  //   // this.updateProfileForm.patchValue({
  //   //   username,
  //   //   website,
  //   //   avatar_url,
  //   // })
  // }

  ngOnInit(): void {
    this.models = this.modelsSvc.getModelsByProduct(this.productId());
    // this.products = this.productsSvc.getProductsByCategory(this.categoryId());
  }

  // async getProfile(id: string) {
  //   try {

  //     let { data, error } = await supabase
  //       // .from('produtcs')
  //       // .select(id)
  //       .from('produtcs')
  //       .select()
  //       .eq('id', id)        

  //     // console.log('entro a single22')
  //     console.log(data);

  //     // this.product = data;
  //     this.models.set(data);

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

  onAddToCart() {
    // this.cartStore.addToCart(this.product() as Product);
  }

  generateSVG(index: number): SafeHtml {
    let svgContent = null;

    //TODO: pendiente rating
    const rate = 4.5;//this.product()?.rating.rate as number;

    if (index + 1 <= Math.floor(rate)) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`;
    } else if (index < rate) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="partialFillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:1" />
              <stop offset="50%" style="stop-color:currentColor; stop-opacity:0" />
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#partialFillGradient)"></path>
        </svg>`;
    } else {
      svgContent = `<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
              </path>
            </svg>`;
    }
    return this._sanitizer.bypassSecurityTrustHtml(svgContent);
  }
}
