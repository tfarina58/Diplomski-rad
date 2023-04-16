import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingsComponent} from "./settings.component";
import {PersonalInfoComponent} from "./personal-info/personal-info.component";

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  },
  {
    path: 'personal-info',
    component: PersonalInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
