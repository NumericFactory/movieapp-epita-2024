import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.log('Error Interceptor', req);

    return next.handle(req).pipe(
      tap({

        error: (err) => {
          console.log(err)
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 401:
                alert(err.error.message);
                this.route.navigate(['/login']);
                break;
              case 403:
                alert(err.error.message)
                break;
              case 404:
                alert(err.error.message)
                break;
              case 419:
                alert(err.error.message)
                break;

              default:
                alert("Erreur serveur")
            }
          }

        }
      })
    )
  }

}
