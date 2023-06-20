import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {HomeComponent} from "./pages/home/home.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {LegalInfoComponent} from "./pages/settings/legal-info/legal-info.component";
import {PersonalInfoComponent} from "./pages/settings/personal-info/personal-info.component";
import {ResetPasswordComponent} from "./pages/auth/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'legal-info',
    component: LegalInfoComponent
  },
  {
    path: 'personal-info',
    component: PersonalInfoComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
