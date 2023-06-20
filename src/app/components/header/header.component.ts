import { Component } from '@angular/core';
import {NavigationService} from "../../services/navigation/navigation.service";
import {StorageService} from "../../services/storage/storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  activeElement: string = 'home';
  user: any; // TODO: Individual | Company | undefined

  constructor(public navService: NavigationService,
              private storage: StorageService) {}

  ngOnInit() {
    this.user = this.storage.getUserInfo();
    if (!this.user) return;

    if (!this.user?.image) this.user.image = 'assets/images/portrait.png';
  }
  async click(target: string) {
    (document.getElementById(this.activeElement) as HTMLElement).classList.remove('active');
    (document.getElementById(target) as HTMLElement).classList.add('active');
    this.activeElement = target;
    // await this.navService.navigateTo('/' + target);
  }
  openDropdown() {

  }

}
