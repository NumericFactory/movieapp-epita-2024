import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UserService } from '../services/user.service';
import { Utils } from '../utils/utils';

interface Endpoint {
  endpoint: string,
  method: 'ALL' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  // list of endpoints need a user token
  private apiAuthEndpoints: Endpoint[] = [
    { endpoint: '/watchlist', method: 'ALL' },
    { endpoint: '/reviews', method: 'POST' },
    // add other...
  ];
  TMDB_URL = environment.TMDB_API_URL;
  TMDB_TOKEN = environment.TMDB_TOKEN;
  MYAPI_URL = environment.API_URL;
  USER_TOKEN = this._userSvc.getToken();

  constructor(private _userSvc: UserService) { }

  /** 
   * le rôle de intercept est d'intercepter req (HttpRequest Object)
   * afin dajouter un nom un token (on the fly) selon :
   * l'API appelée, le endpoint et la méthode 
  */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('token interceptor', req);
    let cloneRequest: HttpRequest<any> = req;

    // SI API TMDB
    if (req.url.includes(this.TMDB_URL)) {
      cloneRequest = this.addBearerToken(req, this.TMDB_TOKEN);
    }

    // SI notre API et SI l'url necessite l'authentification
    if (this.isUrlNeedsUserToken(req)) {
      if (this.USER_TOKEN !== null)
        cloneRequest = this.addBearerToken(req, this.USER_TOKEN);
    }

    return next.handle(cloneRequest);
  }




  /**
    * Check if 
    * url called is my api 
    * url needs user token or not
    * @param request:HttpRequest
    * @returns boolean
  */
  private isUrlNeedsUserToken(request: HttpRequest<any>): boolean {
    if (request.url.includes(this.MYAPI_URL)) {
      let endpoint = Utils.getUrlEndpoint(this.MYAPI_URL, request.url);
      // verify if the request exists in endPoint[] we defined
      let requestIsAnAuthEnpoint = this.apiAuthEndpoints.find(item =>
        item.endpoint === endpoint &&
        item.method === request.method || item.method === 'ALL'
      );
      if (requestIsAnAuthEnpoint) {
        return true;
      }
    }
    return false;
  }


  /**
   * addBearerToken
   * @param request 
   * @param token 
   * @returns req:HttpRequest
   */
  private addBearerToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers
        .append('Authorization', `Bearer ${token}`)
        .append('accept', 'application/json'),
    })
  }

}
