import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {NavigationService} from "../../../services/navigation/navigation.service";
import {PopUpService} from "../../../services/pop-up/pop-up.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('([-!#-\'*+/-9=?A-Z^-~]+(\\.[-!#-\'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+'), Validators.minLength(8)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    repeatPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]))
  }, {
    validators: this.confirmedValidator('password', 'repeatPassword')
  });

  hash: string | undefined;

  constructor(private formBuilder: FormBuilder,
              private toast: ToastrService,
              private popup: PopUpService,
              public navService: NavigationService) {}

  ngOnInit() {
    const res = this.getResetPasswordInfo();
    if (!res.hash) this.toast.error('Seems like there was a problem... Please retry resetting your password by sending yourself another e-mail.')

    this.hash = res.hash;
    this.resetPasswordForm.get('email')?.setValue(res.email);
  }

  cantChangeEmail() {
    this.popup.showWarningToast("This mail is set only to give you context to which email you're sending the link to reset your password", {closeButton: true, timeOut: 4000, progressBar: true, progressAnimation: 'increasing', enableHtml: true, newestOnTop: true});
  }

  getResetPasswordInfo() {
    return {
      id: '8c4289a297b9578dd296d04ad0ce596a',
      email: 'tfarina58@gmail.com',
      hash: 'c96dd568316deb9d8c7dec73b4c27cbb'
    };
  }

  async submit() {
    // Invalid data submitted
    if (this.resetPasswordForm.invalid) {
      let invalid: string = '';
      const controls = this.resetPasswordForm.controls;
      for (const name in controls) if (controls[name].invalid) invalid = invalid + '</br>• ' + this.firstCapital(name);

      this.toast.warning('Following fields do not have adequate value(s):' + invalid, "Warning", { closeButton: true, timeOut: 4000, progressBar: true, progressAnimation: 'increasing', enableHtml: true, newestOnTop: true });
      return;
    }

    // Valid data submitted
    console.log(this.resetPasswordForm.getRawValue());
    this.toast.success("Password reset was successful!", "Success:");
    await this.navService.navigateTo('/home');
  }

  firstCapital(value: string): string {
    return value[0].toUpperCase() + value.substring(1, value.length);
  }

  changePasswordVisibility() {
    let elem1 = document.getElementById('password');
    let elem2 = document.getElementById('repeatPassword');
    if (!elem1 || !elem2) return;

    if (elem1?.attributes[1].value == "password" && elem2) {
      elem1.attributes[1].value = "text";
      elem2.attributes[1].value = "text";
    } else {
      elem1.attributes[1].value = "password";
      elem2.attributes[1].value = "password";
    }
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    // Checking for matching passwords
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) return;
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
