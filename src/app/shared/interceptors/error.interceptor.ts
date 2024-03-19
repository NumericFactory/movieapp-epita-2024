import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  MY_API = environment.API_URL

  constructor(private _route: Router, private _alert: AlertService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.log('Error Interceptor', req);

    return next.handle(req).pipe(
      tap({
        error: (err) => {
          console.log(err)
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 400:
                // if (req.url.includes(this.MY_API+'/users') && req.method=='POST') 
                this._alert.show(err.error.message);
                break;
              case 401:
                this._alert.show(err.error.message);
                this._route.navigate(['/login']);
                break;
              case 403:
                this._alert.show(err.error.message)
                break;
              case 404:
                this._alert.show(err.error.message)
                break;
              case 419:
                this._alert.show(err.error.message)
                break;
              case 409:
                this._alert.show(err.error.message)
                break;

              default:
                this._alert.show("Erreur serveur")
            }
          }

        }
      })
    )
  }

}
