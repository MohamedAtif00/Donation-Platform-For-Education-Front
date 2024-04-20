import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";
import { AllowAccessResponse } from "src/app/authentication/Model/response/allow-access.response";
import { AuthService } from "src/app/authentication/Service/auth.service";

@Injectable({
    providedIn:'root'
})
export class AdminCateActivate implements CanActivate{



    constructor(private authServ: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
         if (this.authServ.token) 
         {
           return this.authServ.AllowAccessToken().pipe(
            map(data => {
              if (data && data.role === 'Admin') {
                return true; // Allow navigation
              } else {
                // Redirect to a different route if not authorized
                return this.router.createUrlTree(['/auth', 'admin-login']);
              }
            }),
            catchError((error: any) => {
              console.error('Error allowing access:', error);
              // Redirect to error page or login page if there's an error
              return of(this.router.createUrlTree(['/auth', 'admin-login']));
            })
          );
        } else {
          // Redirect to login page if token is not available
          return of(this.router.createUrlTree(['/auth', 'admin-login']));
        }
      }

}