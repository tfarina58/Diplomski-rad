import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../services/navigation/navigation.service";
import {Company, Individual} from "../../interfaces/user/user";
import {StorageService} from "../../services/storage/storage.service";
import {CompanyEstate, IndividualEstate} from "../../interfaces/estate/estate";

import * as L from 'leaflet';
import {Icon, LatLng} from 'leaflet';
import {PopUpService} from "../../services/pop-up/pop-up.service";

@Component({
  selector: 'app-my-estates',
  templateUrl: './my-estates.component.html',
  styleUrls: ['./my-estates.component.scss']
})
export class MyEstatesComponent implements OnInit {

  user: Individual | Company | undefined;
  estates: (IndividualEstate | CompanyEstate)[] | undefined = this.storage.getUserEstates();

  displayAs: boolean = false; // True for map, false for list
  constructor(public navService: NavigationService,
              private popup: PopUpService,
              private storage: StorageService) {}

  async ngOnInit() {
    await this.checkMandatoryValues();
      let map: any = L.map('map')
        .setView(new LatLng(45.340828, 14.404830), 13)
        .on('click', () => {})
        .on('locationfound', (event) => {})
        .on('locationerror', (event) => {})
        .on('moveend', () => {console.log(map.getCenter());});


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const marker = L.marker([45.340828, 14.404830]).addTo(map);


    /*L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoidGZhcmluYSIsImEiOiJja3o2cTJzemkwcm84Mm5wa3A1MHpibDV2In0.FiQn7FvA_WIlG2Enm7phJg'
    }).addTo(map);

      L.control.scale({
        metric: true,
        imperial: true,
        position: 'topright',
        maxWidth: 150
      }).addTo(map);*/
  }

  createMapLayers(map: any) {

  }

  createMarker(map: any) {
    let activityIcon: Icon = L.icon({
      iconUrl: '../../../../assets/images/user.jpg',
      iconSize: [60, 60],
      iconAnchor: [20, 20],
      popupAnchor: [0, 0]
    });

    L.marker([13, 13], {icon: activityIcon})
      .addEventListener("click", async () => {}).addTo(map);
  }

  changeDisplay() {
    this.displayAs = !this.displayAs;
    if (!this.displayAs) {
      setTimeout(() => {// this.map.setView(new LatLng(45.340828, 14.404830), 13);
      }, 100);
    }
  }

  async checkMandatoryValues() {
    this.user = this.storage.getUserInfo();
    if (!this.user) {
      await this.popup.showWarningToast("You must be logged in in order to proceed to this page!");
      await this.navService.navigateTo('/login');
    }
  }

}
