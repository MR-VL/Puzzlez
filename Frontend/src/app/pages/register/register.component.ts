import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {RegistrationRequest} from '../../services/models/registration-request';
import {Secrets} from "../../../../secrets";
declare const grecaptcha: any;

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
  siteKey: string | undefined;


  constructor(
    private router: Router,
    private authService: AuthenticationService

  ) {
    this.siteKey = Secrets.RECAPTCHA_SITE_KEY;
  }


  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];

    const recaptchaResponse = grecaptcha.getResponse();


    if (!recaptchaResponse) {
      this.errorMsg.push('Please complete the reCAPTCHA.');
      return;
    }

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

  ngOnInit(): void {
   this.loadRecapcha();
  }

  private loadRecapcha() {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => this.renderReCaptcha();
    document.body.appendChild(script);
  }
  renderReCaptcha() {
    if (grecaptcha) {
      grecaptcha.render('recaptcha-element', {
        'sitekey': this.siteKey
      });
    }
  }
}
