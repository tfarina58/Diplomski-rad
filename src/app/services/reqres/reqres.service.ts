import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReqresService {

  endpoint: string = '';
  token: string = '';
  constructor(private http: HttpClient) {}

  sendRequest(service: string, method: string, params?: Array<any>, file?: File): Promise<any> {
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

  sessionExpiredWarning() {
    console.log("Session expired!");
  }

}
