import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  TMDB_URL = environment.TMDB_API_URL;
  TMDB_TOKEN = environment.TMDB_TOKEN;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req);
    console.log(next);
    let cloneRequest!: HttpRequest<any>;

    // req.url => return l'url qui est appelée
    // let cloneRequest = req.clone()

    console.log('Avant : ', req);

    if (req.url.includes(this.TMDB_URL)) {
      cloneRequest = req.clone({
        headers: req.headers
          .append('Authorization', `Bearer ${this.TMDB_TOKEN}`)
          .append('accept', 'application/json'),
      })
    }

    console.log('apres : ', cloneRequest);


    return next.handle(cloneRequest);
  }

}

