import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ErrorResponseInterceptor } from '@shared/interceptors/error-response.interceptor';
import { SpinnerInterceptor } from '@shared/interceptors/spinner.interceptor';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, RecaptchaSettings, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from '@envs/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({ timeOut: 3000, positionClass: 'toast-bottom-right', preventDuplicates: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([ErrorResponseInterceptor, SpinnerInterceptor])
    ),
    importProvidersFrom(
      RecaptchaV3Module
    ),
    // { provide: RECAPTCHA_V3_SITE_KEY, useValue: "6Ldl4dgpAAAAAOaitS_6xpc0-5aQcOeCoOvTkpNi" }
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.RECAPTCHA_V3_STACKBLITZ_KEY
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.RECAPTCHA_V2_DUMMY_KEY
      } as RecaptchaSettings
    }
  ],
};
