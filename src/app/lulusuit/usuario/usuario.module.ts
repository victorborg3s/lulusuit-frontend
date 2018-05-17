import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToasterModule } from 'angular2-toaster';

import { NbCardModule } from '@nebular/theme/components/card/card.module';
import { NbCheckboxModule } from '@nebular/theme/components/checkbox/checkbox.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { UsuarioComponent } from './usuario.component';
import { UsuarioService } from './usuario.service';
import { AuthInterceptor } from '../../auth.interceptor';
import { UsuarioAuthorityRenderComponent } from './usuario-authority-render.component';
import { UsuarioEnabledRenderComponent } from './usuario-enabled-render.component';
import { UsuarioModalComponent } from './usuario-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NbCardModule,
    NbCheckboxModule,
    Ng2SmartTableModule,
    ToasterModule,
  ],
  declarations: [
    UsuarioComponent,
    UsuarioAuthorityRenderComponent,
    UsuarioEnabledRenderComponent,
    UsuarioModalComponent,
  ],
  exports: [
    UsuarioComponent,
    UsuarioAuthorityRenderComponent,
    UsuarioEnabledRenderComponent,
    UsuarioModalComponent,
  ],
  entryComponents: [
    UsuarioComponent,
    UsuarioAuthorityRenderComponent,
    UsuarioEnabledRenderComponent,
    UsuarioModalComponent,
  ],
  providers: [
    UsuarioService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class UsuarioModule { }
