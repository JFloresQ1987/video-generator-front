import { HttpClient } from '@angular/common/http';
import {
    Injectable,
    inject,
    signal,
} from '@angular/core';
import { environment } from '@envs/environment';
import { Category } from '@shared/models/category.interface';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
    public categories = signal<Category[]>([]);
    private readonly _http = inject(HttpClient);
    private readonly _endPoint = environment.apiURL;

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
