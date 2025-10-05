import { Routes } from '@angular/router';
import { UHome } from './pages/user/u-home/u-home';
import { UProflie } from './pages/user/u-proflie/u-proflie';
import { Login } from './pages/user/login/login';
import { Register } from './pages/user/register/register';
import { AProfile } from './pages/admin/a-profile/a-profile';
import { AHome } from './pages/admin/a-home/a-home';

export const routes: Routes = [
  { path: '', component: Login},
  { path: 'login', component: Login},
  { path: 'register', component: Register},

  //User
  { path: 'u_proflie', component: UProflie},
  { path: 'u_home', component: UHome},

  //Admin
  { path: 'a_proflie', component: AProfile},
  { path: 'a_home', component: AHome},
];
