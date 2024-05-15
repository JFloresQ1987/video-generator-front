import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { OrdersService } from '@api/orders.service';

@Injectable({
    providedIn: 'root'
})
export class PreviewGuard implements CanActivate {

    private readonly ordersSvc = inject(OrdersService);

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const orderId = route.params['id'];
        // console.log('entro a PreviewGuard', orderId);

        this.ordersSvc.getOrderById(orderId).subscribe((res: any) => {

            if (res) {
                //TODO: validar fecha de vigencia
                return true;
            }
            else {
                //TODO: tal vez mostrar página con aviso de error
                this.router.navigateByUrl('/categories');
                return false;
            }
        });

        return true;
    }
}
