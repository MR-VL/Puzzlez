import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {AuthenticationRequest} from '../../services/models/authentication-request';
import {TokenService} from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }
  login() {
    localStorage.removeItem('token');
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['puzzles']);
      },

      error: (err) => {
        if (err.error && err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else if (err.error && err.error.error) {
          this.errorMsg = [err.error.error];
        } else {
          this.errorMsg = ['An unknown error occurred'];
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
