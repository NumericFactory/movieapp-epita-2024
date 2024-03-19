import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.setLoader(true)
    return next.handle(req).pipe(
      tap({
        // si ErrorHttpResponse, on set loader à FALSE*
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            this.loaderService.setLoader(false)
          }
        },
        // si la request est terminée, on set loader à FALSE*
        finalize: () => {
          this.loaderService.setLoader(false)
        }
      })
    )
  }

}
