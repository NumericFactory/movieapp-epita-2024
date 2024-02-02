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

  TMDB_URL = environment.TMDB_API_URL;
  TMDB_TOKEN = environment.TMDB_TOKEN;
  MYAPI = environment.API_BASE_URL;
  USER_TOKEN = this.userSvc.getToken();

  /* endpoints needs a user token in our API */
  apiAuthEndpoints: Endpoint[] = [
    { endpoint: '/watchlist', method: 'ALL' },
    { endpoint: 'reviews', method: 'POST' },
    // add other endpoints...
  ];

  constructor(private userSvc: UserService) { }

  /** 
   * Ici le rôle de intercept est d'intercepter req (HttpRequest Object)
   * afin dajouter un nom un token selon l'API et le endpoint appelé
   * 
   * > Si on appelle l'API TMDB 
   *   on set les headers {Authorization : ' bearer [tokenTMDB]'}
   * 
   * > Si on appelle notre API 
   *   selon l'URL et method, on set les headers {Authorization : ' bearer [tokenUtilisateur]'}
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


  /*  
    Check if : 
    * url called is my api 
    * url needs user token or not
    * @param request:HttpRequest
    * @returns boolean
  */
  isUrlNeedsUserToken(request: HttpRequest<any>): boolean {
    if (request.url.includes(this.MYAPI)) {
      let endpoint = Utils.getUrlEndpoint(request.url, this.MYAPI);
      // verify if the request is in apiAuthEndpoints Array we defined
      let requestIsAnAuthEnpoint = this.apiAuthEndpoints.find(item =>
        item.endpoint === endpoint &&
        item.method === request.method || item.method === 'ALL'
      );
      if (requestIsAnAuthEnpoint) {
        return true
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
  addBearerToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers
        .append('Authorization', `Bearer ${token}`)
        .append('accept', 'application/json'),
    })
  }

}
