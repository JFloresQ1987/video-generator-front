import { Component, inject } from '@angular/core';
import { ReCaptchaV3Service, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [RecaptchaModule],
  templateUrl: './captcha.component.html',
})
export class CaptchaComponent {

  recaptchaService = inject(ReCaptchaV3Service);

  executeRecaptcha() {
    this.recaptchaService.execute('').subscribe((token) => {
      console.log(token)
    });
  }

  executeRecaptchaVisible(token: any) {
    console.log(token);
  }

}
