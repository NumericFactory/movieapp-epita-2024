import { Injectable } from '@angular/core';
import { UserModel } from '../../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
interface ResponseWithToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  MYAPI_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  /**
   * createUser
   * call api pour créer un user
   * @param UserModel
   * @returns Observable<any>
   */
  createUser(user: UserModel): Observable<any> {
    let endpoint = '/users';
    return this.http.post(this.MYAPI_URL + endpoint, user)
  }


  /** loginUser 
   *  endpoint /auth/login
   *  @param UserModel
   *  @returns Observable<any>
  */
  loginUser(user: UserModel): Observable<any> {
    let endpoint = '/auth/login';
    return this.http.post<ResponseWithToken>(this.MYAPI_URL + endpoint, user)
      // store token in localStorage
      .pipe(
        tap((response: ResponseWithToken) => {
          if (response.token && response.token.length)
            this.storeToken(response.token);
        })
      )
  }


  storeToken(token: string) {
    localStorage.setItem('token', token);
  }


  getToken() {
    return localStorage.getItem('token')
  }

  isUserAuthenticated() {
    // côté front, ça signifie récupérer le payload du token (la date de validité)
    // côté backend => POST token
  }


}
