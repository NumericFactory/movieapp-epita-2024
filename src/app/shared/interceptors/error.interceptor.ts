import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  MY_API = environment.API_BASE_URL

  constructor(private route: Router, private alert: AlertService) { }

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
                this.alert.show(err.error.message);
                break;
              case 401:
                this.alert.show(err.error.message);
                this.route.navigate(['/login']);
                break;
              case 403:
                this.alert.show(err.error.message)
                break;
              case 404:
                this.alert.show(err.error.message)
                break;
              case 419:
                this.alert.show(err.error.message)
                break;
              case 409:
                this.alert.show(err.error.message)
                break;

              default:
                this.alert.show("Erreur serveur")
            }
          }

        }
      })
    )
  }

}
