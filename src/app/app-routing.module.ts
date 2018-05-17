import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { NgxLoginComponent } from './@theme/components/login/ngx-login.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'lulusuit',
    canActivate: [AuthGuard],
    loadChildren: 'app/lulusuit/lulusuit.module#LulusuitModule'
  }, {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NgxLoginComponent,
      },
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  }, {
    path: '',
    redirectTo: 'lulusuit',
    pathMatch: 'full',
  }, {
    path: '**',
    redirectTo: 'lulusuit'
  },
];

const config: ExtraOptions = {
  useHash: true,
  // enableTracing: true, // only for debug purpouse
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
