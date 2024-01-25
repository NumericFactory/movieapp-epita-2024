import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  MYAPI_URL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }


  createUser(user: UserModel): Observable<any> {
    return this.http.post(this.MYAPI_URL, user)
  }
}
