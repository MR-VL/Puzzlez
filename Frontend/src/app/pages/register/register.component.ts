import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {RegistrationRequest} from '../../services/models/registration-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  errorMsg: Array<string> = [];

  public pw1 = "";
  public pw2 = "";
  public pwNotMatch = "Passwords do not match, please try again.";
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];

    if (this.pw1 === this.pw2) {
      this.registerRequest.password = this.pw1;
      this.authService.register({
        body: this.registerRequest
      })
        .subscribe({
          next: () => {
            this.router.navigate(['activate-account']);
          },


          error: (err) => {
            this.errorMsg = err.error.validationErrors.map((msg: string) => msg );
          }

        });
    }

    else{
      this.errorMsg.push(this.pwNotMatch);
    }
  }

}
