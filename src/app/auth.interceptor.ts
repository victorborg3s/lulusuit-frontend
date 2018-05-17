import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
} from '@angular/common/http';

import { NbAuthJWTToken, NbAuthService, NbTokenService } from '@nebular/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private token: NbAuthJWTToken;

  constructor(protected auth: NbAuthService,
              protected tokenService: NbTokenService) {

    auth.onTokenChange()
      .subscribe((t: NbAuthJWTToken) => {

        if (t.isValid()) {
          this.token = t;
        }

      });

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (this.token) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', this.token.getValue())
      });

      if (req.method == "DELETE" && req.url.indexOf('logout') >= 0) {
        this.tokenService.clear();
      }

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }

  }
}
