import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

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
    return this.http.post(this.MYAPI_URL + endpoint, user)

  }



}
