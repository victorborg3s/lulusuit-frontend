import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LulusuitComponent } from './lulusuit.component'
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AuthGuard } from '../auth-guard.service';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [{
  path: '',
  component: LulusuitComponent,
  children: [{
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  }, {
    path: 'crud-user',
    canActivate: [AuthGuard],
    component: UsuarioComponent,
  }, {
    path: 'ui-features',
    loadChildren: '../pages/ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'components',
    loadChildren: '../pages/components/components.module#ComponentsModule',
  }, {
    path: 'maps',
    loadChildren: '../pages/maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: '../pages/charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: '../pages/editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: '../pages/forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: '../pages/tables/tables.module#TablesModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LulusuitRoutingModule {
}
