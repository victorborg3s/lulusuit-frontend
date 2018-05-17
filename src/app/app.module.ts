import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';
import { NB_AUTH_TOKEN_CLASS, NbAuthJWTToken } from '@nebular/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth-guard.service';
import {
  NbAuthModule,
  NbEmailPassAuthProvider,
} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider, NbAclService, NbAccessChecker } from '@nebular/security'
import { authConfig } from './auth.config';
import { accessConfig } from './access.config';
import { AuthInterceptor } from './auth.interceptor';
import { RoleProvider } from './role.provider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: authConfig,
        },
      },
    }),
    NbSecurityModule.forRoot(accessConfig),
  ],
  bootstrap: [AppComponent],
  exports: [NbAuthModule],
  providers: [
    AuthGuard,
    NbEmailPassAuthProvider,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NbRoleProvider, useClass: RoleProvider },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NB_AUTH_TOKEN_CLASS, useValue: NbAuthJWTToken },
  ],
})
export class AppModule {
}
