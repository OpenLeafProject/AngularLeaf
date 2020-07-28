import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.sass']
})
export class UserRegisterComponent implements OnInit {

  displayMessage = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone
  ) { }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repassword: new FormControl('', Validators.required)

  });

  hidePassword: any = true;

  ngOnInit() {
    /*
    this.afAuth.user.subscribe(user => ({
      if(user) {
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        })
      }
    }));
    */
  }

  createUser() {

  }

  
    // Auth logic to run auth providers
    AuthLogin(provider) {

    }

  handleError(code) {
    switch (code) {
      case 'auth/invalid-email':
        this.displayMessage = 'Formato de mail incorrecto';
        break;
      case 'auth/wrong-password':
        this.displayMessage = 'Contraseña incorrecta';
        break;
      case 'auth/user-not-found':
        this.displayMessage = 'El usuario no existe';
        break;
      case 'auth/weak-password':
        this.displayMessage = 'La contraseña es demasiado débil';
        break;
      case 'auth/email-already-in-use':
        this.displayMessage = 'El correo indicado ya esta en uso';
        break;
      case 'auth/weak-password':
        this.displayMessage = 'La contraseña es demasiado débil';
        break;
      case 'auth/password-mismatch':
        this.displayMessage = 'Las contraseñas no coinciden';
        break;
      default:
        this.displayMessage = code;
        break;

    }
  }
}
