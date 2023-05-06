import { Component } from '@angular/core';
import {NavigationService} from "../../services/navigation/navigation.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(public navService: NavigationService) {}

  async logOut() {
    console.log("Logged out!");
    await this.navService.navigateTo('/auth');
  }

}
