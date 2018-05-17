import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LulusuitComponent } from './lulusuit.component';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { LulusuitRoutingModule } from './lulusuit-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { UsuarioModule } from './usuario/usuario.module';

const PAGES_COMPONENTS = [
  LulusuitComponent,
];

@NgModule({
  imports: [
    LulusuitRoutingModule,
    ThemeModule,
    DashboardModule,
    HttpClientModule,
    UsuarioModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class LulusuitModule {
}
