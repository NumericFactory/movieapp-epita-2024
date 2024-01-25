import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrl: './register-view.component.scss'
})
export class RegisterViewComponent {

  userForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    /**
     * Créer une instance de FormGroup
     */
    this.userForm = this.fb.group({
      username: ['',
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ],
      password: ['',
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(5)
      ]
    })
  }

  /**
   * Role verifier la validité et appeler 
   * la méthode createUser du UserService
   */
  onSubmitUserRegisterForm(): void {
    this.isSubmitted = true;
    console.log(this.userForm.value);
    console.log('is Valid ? ', this.userForm.valid)
  }

}
