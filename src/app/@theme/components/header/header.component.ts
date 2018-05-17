import { Component, Input, OnInit } from '@angular/core';
import { HttpEvent } from '@angular/common/http';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import { map } from 'rxjs/operators/map';

import { Usuario } from '../../../lulusuit/usuario/usuario';
import { UsuarioService } from '../../../lulusuit/usuario/usuario.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  title: string;
  imageBase64: string;

  userMenu = [
    {
      title: 'Profile'
    },
    {
      title: 'Log out',
      link: '/auth/logout'
    }
  ];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UsuarioService,
    private analyticsService: AnalyticsService,
    private authService: NbAuthService,
    private accessChecker: NbAccessChecker) {

  }

  ngOnInit() {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable

          if (!this.title || this.title == "") {
            this.userService.getById(this.user.id).subscribe((user: Usuario) => {

              this.imageBase64 = user.imageBase64;

              if (user.authority == "ROLE_USER") {
                this.title = "Usuário Básico";
              } else if (user.authority == "ROLE_ADMIN") {
                this.title = "Usuário Administrador";
              }

            });
          }
        }

      });

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

}
