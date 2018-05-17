import { Component } from '@angular/core';

import { MENU_ITEMS } from './lulusuit-menu';

@Component({
  selector: 'ngx-lulusuit',
  template: `
    <ngx-default-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-default-layout>
  `,
})
export class LulusuitComponent {

  menu = MENU_ITEMS;
}
