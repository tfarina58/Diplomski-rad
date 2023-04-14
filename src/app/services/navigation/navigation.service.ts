import { Injectable } from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {}

  async navigateTo(destination: string, params?: object) {
    const navigationExtras: NavigationExtras = {state: params};
    await this.router.navigate([destination], navigationExtras)
  }
}
