import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Company, Individual} from "../../interfaces/user/user";
import {CompanyEstate, IndividualEstate} from "../../interfaces/estate/estate";
import {StorageService} from "../storage/storage.service";
import {PopUpService} from "../pop-up/pop-up.service";
import {UserRes, SessionRes} from "../../interfaces/reqres/reqres"

@Injectable({
  providedIn: 'root'
})

export class ReqresService {

  endpoint: string = '';
  token: string = '';
  constructor(private http: HttpClient,
              private popup: PopUpService,
              private storage: StorageService) {}

  async sendRequest(service: string, method: string, params?: Array<any>, file?: File): Promise<any> {
    return new Promise((resolve, reject) => {

      /*  let headers = new HttpHeaders();
        headers = headers.append('authorization', this.token);

        let _params: any;
        let body: any = params;

        if (file) {
          headers = headers.append('content-type', file.type);
          _params = params.map(param => typeof param == 'object' ? JSON.stringify(param) : param);
          body = file;
        }

        method = method.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

        let url = this.endpoint + "/gateway/" + service + "/" + method
        this.http.post(url, body, {
          headers: headers,
          params: _params,
          observe: 'response'
        }).subscribe(data => {

          resolve(data.body);
        }, err => {
          if (err.status === 200) {
            resolve(false);
            throw new Error(err.message);
          } else if (err.status === 400){
            resolve(false);
          }
          reject(err);
        });*/
    });
  }

  async sessionExpirationCheck(): Promise<SessionRes> {
    const loggedUser = this.storage.getUserInfo();
    if (!loggedUser) return {success: false};

    try {
      // Sending request, obtaining response
      let res: SessionRes = {success: true, session: true}; // Temporary

      return res;
    } catch (error) {
      console.log("Login error: ", error);
      return {success: false};
    }
  }

  async login(user: {email: string, password: string}): Promise<UserRes> {
    const loggedUser = this.storage.getUserInfo();
    if (loggedUser) return {success: false};

    if (!user?.email?.length || !user?.password?.length) return {success: false};

    try {
      // Sending request, obtaining response
      let res: UserRes = {success: true, user: this.storage.getUserInfo(), estates: this.storage.getUserEstates()}; // Temporary
      if (res.success) {
        // TODO: uncomment
        this.storage.setUserEstates(res.estates);
        this.storage.setUserInfo(res.user);
      }

      return res;
    } catch (error) {
      console.log("Login error: ", error);
      return {success: false};
    }
  }

  async register(user: Individual | Company | undefined): Promise<UserRes> {
    const loggedUser = this.storage.getUserInfo();
    if (loggedUser) return {success: false};

    if (!user) return {success: false};

    try {
      // Sending request, obtaining response
      let res: UserRes = {success: true, user: this.storage.getUserInfo()}; // Temporary
      if (res.success) {
        // TODO: uncomment
        // this.storage.setUserInfo(undefined);
      }

      return res;
    } catch (error) {
      console.log("Register error: ", error);
      return {success: false};
    }
  }

  async editUserInfo(form: Individual | Company | undefined): Promise<UserRes> {
    const loggedUser = this.storage.getUserInfo();
    if (!loggedUser) return {success: false};

    if (!form) return {success: false};

    try {
      // Sending request, obtaining response
      let res: UserRes = {success: true}; // Temporary
      if (res.success) {
        this.storage.setUserInfo(form);
      }

      return res;
    } catch (error) {
      console.log("Register error: ", error);
      return {success: false};
    }
  }

  async deleteAccount(): Promise<UserRes> {
    const user = this.storage.getUserInfo();
    if (!user) return {success: false};

    try {
      // Sending request, obtaining response
      let res: UserRes = {success: true}; // Temporary
      if (res.success) {
        this.storage.setUserEstates(undefined);
        this.storage.setUserInfo(undefined);
      }

      return res;
    } catch (error) {
      console.log("Delete account error: ", error);
      return {success: false};
    }
  }

  async logout(): Promise<UserRes> {
    const loggedUser = this.storage.getUserInfo();
    if (!loggedUser) return {success: false};

    try {
      // Sending request, obtaining response
      let res: UserRes = {success: true, user: this.storage.getUserInfo(), estates: this.storage.getUserEstates()}; // Temporary
      if (res.success) {
        // TODO: uncomment
        this.storage.setUserInfo(res.user);
        this.storage.setUserEstates(res.estates);
      }

      return res;
    } catch (error) {
      console.log("Login error: ", error);
      return {success: false};
    }
  }

  async addEstate(estate: IndividualEstate | CompanyEstate | undefined): Promise<UserRes> {
    const user = this.storage.getUserInfo();
    if (!user) return {success: false};

    if (!estate) return {success: false};

    try {
      // Sending request, obtaining response
      let res: {success: boolean} = {success: true}; // Temporary
      if (res.success) {
        this.storage.addEstate(estate);
      }
      return res;
    } catch (error) {
      console.log("Delete account error: ", error);
      return {success: false};
    }
  }

  async editEstate(oldEstate: IndividualEstate | CompanyEstate | undefined, newEstate: IndividualEstate | CompanyEstate | undefined): Promise<UserRes> {
    const user = this.storage.getUserInfo();
    if (!user) return {success: false};

    if (!oldEstate) return {success: false};
    if (!newEstate) return {success: false};

    try {
      // Sending request, obtaining response
      let res: {success: boolean} = {success: true}; // Temporary
      if (res.success) {
        this.storage.editEstate(oldEstate, newEstate);
      }
      return res;
    } catch (error) {
      console.log("Delete account error: ", error);
      return {success: false};
    }
  }

  async removeEstate(estate: IndividualEstate | CompanyEstate | undefined): Promise<UserRes> {
    const user = this.storage.getUserInfo();
    if (!user) return {success: false};

    if (!estate) return {success: false};

    try {
      // Sending request, obtaining response
      let res: {success: boolean} = {success: true}; // Temporary
      if (res.success) {
        this.storage.removeEstate(estate);
      }
      return res;
    } catch (error) {
      console.log("Delete account error: ", error);
      return {success: false};
    }
  }

}
