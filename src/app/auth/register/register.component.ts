import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(public authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin().then(res => {
        this.navigateToUserScreen();
      }, err => console.log(err)
    );
  }

  tryTwitterLogin() {
    this.authService.doTwitterLogin().then(res => {
        this.navigateToUserScreen();
      }, err => console.log(err)
    );
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin().then(res => {
        this.navigateToUserScreen();
      }, err => console.log(err)
    );
  }

  tryRegister(value) {
    this.authService.doRegister(value).then(res => {
      console.log(res);
      this.errorMessage = '';
      this.successMessage = 'Your account has been created';
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = '';
    });
  }

  private navigateToUserScreen() {
    this.router.navigate(['/home']).then();
  }
}
