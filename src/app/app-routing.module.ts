import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
{ path: 'home', component: HomeComponent, },
{
  path: 'register',
  loadChildren: () => import('./register/register.module')
    .then(mod => mod.RegisterModule)
},
{
  path: 'login',
  loadChildren: () => import('./login/login.module')
    .then(mod => mod.LoginModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
