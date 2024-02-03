import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrl: './register-view.component.scss'
})
export class RegisterViewComponent {

  userForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private _fb: FormBuilder, private _userSvc: UserService) { }


  ngOnInit() {
    /**
     * Créer une instance de FormGroup
     */
    this.userForm = this._fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(5),
      ]
      ]
    })
  }

  /**
   * Role verifier la validité et appeler 
   * la méthode createUser du UserService
   */
  onSubmitUserRegisterForm(ev: Event): void {
    ev.preventDefault(); // couper le comporement de la soumission du form;
    this.isSubmitted = true;
    console.log(this.userForm)

    if (this.userForm.valid) {
      this._userSvc.createUser(this.userForm.value)
        .subscribe(response => console.log(response))
    }

  }

}
