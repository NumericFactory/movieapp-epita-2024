import { Injectable } from '@angular/core';
import { AuthGateway } from '../ports/auth.gateway';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { PostCredentialsDTO, ResponseTokenDTO } from '../dto/auth.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthGateway {

  API_URL = environment.API_URL

  constructor(
    private http: HttpClient,
    private _router: Router,
    private alertService: AlertService
  ) { }

  private _isAuth$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isAuth$: Observable<boolean> = this._isAuth$.asObservable();

  login(credentials: PostCredentialsDTO): Observable<ResponseTokenDTO> {
    const endpoint = '/auth/login';
    return this.http.post<ResponseTokenDTO>(this.API_URL + endpoint, credentials)
      .pipe(
        tap((response: ResponseTokenDTO) => {
          if (response.token && response.token.length)
            this.storeTokenInLocalStorage(response.token)
          this._isAuth$.next(true);
          this._router.navigate(['']);
        })
      )
  }

  logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['']); // retour à la homePage
    this.alertService.show('Vous êtes déconnecté(e)')
  }

  /* manage store token */
  getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('token')
  }

  storeTokenInLocalStorage(token: string): void {
    localStorage.setItem('token', token)
  }


}
