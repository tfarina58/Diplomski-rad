import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NavigationService} from "../../../services/navigation/navigation.service";
import {PopUpService} from "../../../services/pop-up/pop-up.service";
import {ReqresService} from "../../../services/reqres/reqres.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('([-!#-\'*+/-9=?A-Z^-~]+(\\.[-!#-\'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+'), Validators.minLength(8)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
  });

  constructor(private formBuilder: FormBuilder,
              private popup: PopUpService,
              private reqres: ReqresService,
              public navService: NavigationService) {}

  async submit() {
    // Invalid data submitted
    if (this.loginForm.invalid) {
      let invalid: string = '';
      const controls = this.loginForm.controls;
      for (const name in controls) if (controls[name].invalid) invalid = invalid + '</br>• ' + this.firstCapital(name);

      this.popup.showWarningToast('Following fields do not have adequate value(s):' + invalid);
      return;
    }

    // Valid data submitted
    this.popup.showLoadingScreen();
    try {
      const rawForm = this.loginForm.getRawValue();
      const res = await this.reqres.login(rawForm);
      if (!res.success) {
        this.popup.showErrorToast("There seems to be a problem with the login. Please try again later.");
        return;
      }

      this.popup.showSuccessToast("Login was successful!");
      await this.navService.navigateTo('/home');
    } catch (error) {
      console.log("Login error: ", error);
    } finally {
      this.popup.dismissLoadingScreen();
    }
  }

  firstCapital(value: string): string {
    return value[0].toUpperCase() + value.substring(1, value.length);
  }

  changePasswordVisibility() {
    let elem = document.getElementById('password');
    if (!elem) return;

    if (elem?.attributes[1].value == "password") elem.attributes[1].value = "text";
    else elem.attributes[1].value = "password";
  }
}
