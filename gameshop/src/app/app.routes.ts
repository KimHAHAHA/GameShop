import { Routes } from '@angular/router';
import { UHome } from './pages/user/u-home/u-home';
import { UProflie } from './pages/user/u-proflie/u-proflie';
import { Login } from './pages/user/login/login';
import { Register } from './pages/user/register/register';
import { AProfile } from './pages/admin/a-profile/a-profile';
import { AHome } from './pages/admin/a-home/a-home';
import { UHomeNologin } from './pages/user/u-home-nologin/u-home-nologin';
import { UEditProfile } from './pages/user/u-edit-profile/u-edit-profile';
import { AuthGuard } from './guards/auth.guard';
import { UWallet } from './pages/user/u-wallet/u-wallet';
import { ADetails } from './pages/admin/a-details/a-details';
import { UDetails } from './pages/user/u-details/u-details';
import { AAddgame } from './pages/admin/a-addgame/a-addgame';
import { AEditgame } from './pages/admin/a-editgame/a-editgame';
import { UTopgame } from './pages/user/u-topgame/u-topgame';
import { UStore } from './pages/user/u-store/u-store';
import { ULibrary } from './pages/user/u-library/u-library';
import { ACode } from './pages/admin/a-code/a-code';
import { AUser } from './pages/admin/a-user/a-user';
import { AHistory } from './pages/admin/a-history/a-history';

export const routes: Routes = [
  { path: '', component: UHomeNologin },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  //User
  { path: 'u_proflie', component: UProflie, canActivate: [AuthGuard] },
  { path: 'u_home', component: UHome, canActivate: [AuthGuard] },
  { path: 'u_homeNO', component: UHomeNologin, canActivate: [AuthGuard] },
  { path: 'u_details/:id', component: UDetails, canActivate: [AuthGuard] },
  { path: 'u_editproflie', component: UEditProfile, canActivate: [AuthGuard] },
  { path: 'u_wallet', component: UWallet, canActivate: [AuthGuard] },
  { path: 'u_details', component: UDetails, canActivate: [AuthGuard] },
  { path: 'u_topgame', component: UTopgame, canActivate: [AuthGuard] },
  { path: 'u_store', component: UStore, canActivate: [AuthGuard] },
  { path: 'u_library', component: ULibrary, canActivate: [AuthGuard] },

  //Admin
  { path: 'a_proflie', component: AProfile, canActivate: [AuthGuard] },
  { path: 'a_home', component: AHome, canActivate: [AuthGuard] },
  { path: 'a_details/:id', component: ADetails, canActivate: [AuthGuard] },
  { path: 'a_editgame/:id', component: AEditgame, canActivate: [AuthGuard] },
  { path: 'a_details', component: ADetails, canActivate: [AuthGuard] },
  { path: 'a_history/:uid', component: AHistory, canActivate: [AuthGuard] },
  { path: 'a_addgame', component: AAddgame, canActivate: [AuthGuard] },
  { path: 'a_editgame', component: AEditgame, canActivate: [AuthGuard] },
  { path: 'a_code', component: ACode, canActivate: [AuthGuard] },
  { path: 'a_user', component: AUser, canActivate: [AuthGuard] },
  { path: 'a_history', component: AHistory, canActivate: [AuthGuard] },
];
