import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})
export class LoginViewComponent {
  userLoginForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private _fb: FormBuilder, private _userSvc: UserService) { }

  ngOnInit() {
    /**
     * Créer une instance de FormGroup
     */
    this.userLoginForm = this._fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(5)
      ]
      ]
    })
  }

  /**
   * Role verifier la validité et appeler 
   * la méthode createUser du UserService
   */
  onSubmitUserLoginForm(ev: Event): void {
    ev.preventDefault();
    if (this.userLoginForm.valid) {
      // appeler la méthode loginUser() de UserService...
      this._userSvc.loginUser(this.userLoginForm.value)
        .subscribe({
          next: response => this._userSvc.storeToken(response.token),
          //error: err => alert('Mot de passe ou username erroné'),
          // complete: () => console.log('Terminé')

          // je traite les erreurs HTTP de façon centralisé : dans un interceptor
        })
    }
  }


}
