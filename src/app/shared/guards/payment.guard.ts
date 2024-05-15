import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { OrdersService } from '@api/orders.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentGuard implements CanActivate {

    private readonly ordersSvc = inject(OrdersService);

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const orderId = route.params['id'];
        // console.log('entro a PaymentGuard', orderId);

        this.ordersSvc.getOrderById(orderId).subscribe((res: any) => {

            if (res) {
                
                if (res.payment_state == "paid") {
                    //TODO: validar fecha de expiración
                    return true;
                } else {
                    //TODO: tal vez mostrar página con aviso de error, porque no fue pagado
                    // this.router.navigateByUrl('/previews/');
                    this.router.navigateByUrl(`/previews/${orderId}`);
                    return false;
                    // this.router.navigateByUrl(`/previews/${res.data.id}`);
                }
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
