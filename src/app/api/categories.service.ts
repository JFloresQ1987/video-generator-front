import { HttpClient } from '@angular/common/http';
import {
    Injectable,
    inject,
    signal,
} from '@angular/core';
import { environment } from '@envs/environment';
import { Category } from '@shared/models/category.interface';
import { map, tap } from 'rxjs';
// import Config from '@envs/config.json'
// import Config from '../../assets/config.json'
// import Config from '../../config.json'
import { runtimeEnvironment } from '../../environments/runtimeEnvironment';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
    public categories = signal<Category[]>([]);
    private readonly _http = inject(HttpClient);
    // private readonly _endPoint = environment.API_URL;
    // private readonly _endPoint = 'http://happychecho.qhatuyki.shop/api'
    private readonly _endPoint = environment.production ? runtimeEnvironment.API_URL : environment.API_URL;
    // private readonly _endPoint = environment.production ? Config.API_URL : environment.API_URL;

    constructor() {
        
        this.getCategories();
    }

    public getCategories(): void {

        this._http
            .get<Category[]>(`${this._endPoint}/categories-all`)
            // .pipe(
            //     map((categories: Category[]) =>
            //         // categories.map((category: Category) => ({ ...category, qty: 1 }))
            //         categories.map((category: Category) => ({ ...category }))
            //     ),
            //     tap((categories: Category[]) => this.categories.set(categories))
            // )
            // .subscribe();
            .subscribe((res: any) => {
                this.categories.set(res.data);
            });
    }
}
