import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../services/navigation/navigation.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(public router: Router,
              public actRoute: ActivatedRoute,
              public navService: NavigationService) {
    this.actRoute.queryParams.subscribe(() => {
      const res = this.router.getCurrentNavigation()?.extras.state;
      if (!res) return;
      console.log(res);
    });
  }

}
