import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyEstate, IndividualEstate} from "../../../interfaces/estate/estate";

@Component({
  selector: 'app-estate-details',
  templateUrl: './estate-details.component.html',
  styleUrls: ['./estate-details.component.scss']
})
export class EstateDetailsComponent {

  estate: IndividualEstate | CompanyEstate | undefined;
  constructor(private actRoute: ActivatedRoute,
              private router: Router) {
    this.actRoute.queryParams.subscribe(() => {
      const res = this.router.getCurrentNavigation()?.extras.state;
      if (!res || !res['estate']) return;
      this.estate = res['estate'];
      console.log(this.estate);
    });
  }

}
