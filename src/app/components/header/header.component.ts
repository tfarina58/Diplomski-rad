import { Component } from '@angular/core';
import {NavigationService} from "../../services/navigation/navigation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  activeElement: string = 'home';

  constructor(public navService: NavigationService) {}

  async click(target: string) {
    (document.getElementById(this.activeElement) as HTMLElement).classList.remove('active');
    (document.getElementById(target) as HTMLElement).classList.add('active');
    this.activeElement = target;
    // await this.navService.navigateTo('/' + target);
  }


}
