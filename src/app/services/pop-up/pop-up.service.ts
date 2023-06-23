import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  loading: any;
  alert: any;
  defaultToastOptions: object = {closeButton: true, timeOut: 4000, progressBar: true, progressAnimation: 'increasing', enableHtml: true, newestOnTop: true}
  constructor(private toast:  ToastrService) {}

  showLoadingScreen() {

  }

  dismissLoadingScreen() {

  }

  showAlert(title: string, message: string) {

  }

  dismissAlert() {

  }

  showSuccessToast(message: string, options?: object) {
    return this.toast.success(message, "Success:", options ? options : this.defaultToastOptions);
  }
  showWarningToast(message: string, options?: object) {
    return this.toast.warning(message,  "Warning:", options ? options : this.defaultToastOptions);
  }
  showErrorToast(message: string, options?: object) {
    return this.toast.error(message,  "Error:", options ? options : this.defaultToastOptions);
  }
}
