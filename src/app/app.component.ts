import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NavigationService} from "./services/navigation/navigation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'newapp';

  constructor(private router: Router,
              private navService: NavigationService) {}


  async ngOnInit() {
    await this.navService.navigateTo('/auth');
  }
}
