import {Component} from '@angular/core';
import {NavigationService} from "../../services/navigation/navigation.service";
import {Company, Individual} from "../../interfaces/user/user";
import {StorageService} from "../../services/storage/storage.service";
import {CompanyEstate, IndividualEstate} from "../../interfaces/estate/estate";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user: Individual | Company | undefined = this.storage.getUserInfo();
  estates: (IndividualEstate | CompanyEstate)[] | undefined = this.storage.getUserEstates();

  constructor(public navService: NavigationService,
              private storage: StorageService) {}

}
