import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { OrdersService } from '@api/orders.service';
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class PaymentGuard implements CanActivate {

    private readonly ordersSvc = inject(OrdersService);

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        // console.log(route.routeConfig?.path)
        const orderId = route.params['id'];
        const es_path_edits = route.routeConfig?.path?.includes('edits');

        // console.log(route.routeConfig?.path?.includes('edits'));

        // console.log('entro a PaymentGuard', orderId);

        this.ordersSvc.getOrderById(orderId).subscribe((res: any) => {

            if (res) {

                const fecha_max = moment(res.payment_access_until);
                const fecha_hoy = moment();
                const minutes = fecha_max.diff(fecha_hoy, 'minutes');

                if (res.payment_state == "paid" && minutes > 0) {
                    //TODO: validar fecha de expiración

                    console.log(es_path_edits)
                    console.log(res.payment_attempt_number)

                    if (es_path_edits) {
                        if (res.payment_attempt_number > 0) {
                            return true;
                        }
                        else {
                            this.router.navigateByUrl(`/sales/${orderId}`);
                            return false;
                        }
                    }

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
