import { Component } from '@angular/core';
import {NavigationService} from "../../../services/navigation/navigation.service";

@Component({
  selector: 'app-legal-info',
  templateUrl: './legal-info.component.html',
  styleUrls: ['./legal-info.component.scss']
})
export class LegalInfoComponent {

  selectedTab: string = 'terms_of_use';
  constructor(public navService: NavigationService) {}

}
