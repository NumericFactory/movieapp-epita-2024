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

  constructor(private fb: FormBuilder, private userSvc: UserService) { }


  ngOnInit() {
    /**
     * Créer une instance de FormGroup
     */
    this.userForm = this.fb.group({
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
  onSubmitUserRegisterForm(ev: Event): void {
    ev.preventDefault()

    this.isSubmitted = true;
    if (this.userForm.valid) {
      this.isSubmitted = false
      /* Remettre à zero form*/
      // this.userForm.reset();
      // createUser
      console.log(this.userForm.value)
      this.userSvc.createUser(this.userForm.value)
        .subscribe(data => console.log(data))

    }
  }

}
