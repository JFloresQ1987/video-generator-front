import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot): boolean {        

        // this.route.params.subscribe(params => {
        //     this.testId = params['id']; // Access the 'id' parameter from the URL
        //     console.log('Test ID:', this.testId);
        //   });

        // const roles = this.service.seguridad.rol;
        // const coincidencias = route.data.roles.filter(rol => roles.includes(rol))

        // if (route.data.roles && coincidencias.length === 0) {

        //     this.router.navigateByUrl('/categories');
        //     //   this.router.navigate(['/dashboard']);
        //   return false;
        // }

        console.log(route.params['id']);        

        return true
    }
}
