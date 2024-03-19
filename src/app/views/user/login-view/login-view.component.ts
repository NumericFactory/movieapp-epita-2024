import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { AuthGateway } from '../../../core/ports/auth.gateway';
import { PostCredentialsDTO } from '../../../core/dto/auth.dto';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})
export class LoginViewComponent {
  userLoginForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private _fb: FormBuilder, private _auth: AuthGateway) { }

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
    let credentials: PostCredentialsDTO = this.userLoginForm.value;
    if (this.userLoginForm.valid) {
      this._auth.login(credentials).subscribe();
    }
  }


}
