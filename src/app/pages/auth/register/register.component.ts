import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NavigationService} from "../../../services/navigation/navigation.service";
import {ToastrService} from "ngx-toastr";
import {Individual, Company} from "../../../interfaces/user/user";
import {ReqresService} from "../../../services/reqres/reqres.service";
import {PopUpService} from "../../../services/pop-up/pop-up.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerFormAsIndividual: FormGroup = this.formBuilder.group({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    phone: new FormControl(''),
    street: new FormControl(''),
    zip: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    email: new FormControl('', Validators.pattern('([-!#-\'*+/-9=?A-Z^-~]+(\\.[-!#-\'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+')),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    repeatPassword: new FormControl('', Validators.required),
    termsAndConditions: new FormControl(false, Validators.requiredTrue)
  }, {
    validators: this.confirmedValidator('password', 'repeatPassword')
  });
  registerFormAsCompany: FormGroup = this.formBuilder.group({
    companyName: new FormControl('', Validators.required),
    ownerFirstname: new FormControl('', Validators.required),
    ownerLastname: new FormControl('', Validators.required),
    phone: new FormControl(''),
    street: new FormControl(''),
    zip: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('([-!#-\'*+/-9=?A-Z^-~]+(\\.[-!#-\'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+')])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
    repeatPassword: new FormControl('', Validators.required),
    termsAndConditions: new FormControl(false, Validators.requiredTrue)
  }, {
    validators: this.confirmedValidator('password', 'repeatPassword')
  });

  chosenForm: boolean = true; // True for individual, false for company
  constructor(private formBuilder: FormBuilder,
              private toast: ToastrService,
              private reqres: ReqresService,
              private popup: PopUpService,
              public navService: NavigationService) {}

  async submit(form: FormGroup) {
    // Invalid data submitted
    if (form.invalid) {
      let invalid: string = '';
      const controls = form.controls;
      for (const name in controls) if (controls[name].invalid) invalid = invalid + '</br>• ' + this.firstCapital(name);

      this.toast.warning('Following fields do not have adequate value(s):' + invalid, "Warning", { closeButton: true, timeOut: 4000, progressBar: true, progressAnimation: 'increasing', enableHtml: true, newestOnTop: true });
      return;
    }

    // Valid data submitted
    this.popup.showLoadingScreen();
    try {
      let rawForm: Individual | Company | undefined;
      if (this.chosenForm) {
        rawForm = form.getRawValue() as Individual;
        rawForm.typeOfUser = 'individual';
      } else {
        rawForm = form.getRawValue() as Company;
        rawForm.typeOfUser = 'company';
      }

      let res = await this.reqres.register(rawForm);
      if (!res?.success) {
        this.popup.showErrorToast("There seems to be a problem with the registration. Please try again later.");
        return;
      }

      this.toast.success("Registration was successful!", "Success:");
      await this.navService.navigateTo('/home');
    } catch (error) {
        console.log("Register error: ", error);
    } finally {
      this.popup.dismissLoadingScreen();
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

  firstCapital(value: string): string {
    return value[0].toUpperCase() + value.substring(1, value.length);
  }

  changePasswordVisibility() {
    let elem1 = document.getElementById(this.chosenForm ? 'ip' : 'cp');
    let elem2 = document.getElementById(this.chosenForm ? 'ipr' : 'cpr');
    if (!elem1 || !elem2) return;

    if (elem1?.attributes[1].value == "password" && elem2) {
      elem1.attributes[1].value = "text";
      elem2.attributes[1].value = "text";
    } else {
      elem1.attributes[1].value = "password";
      elem2.attributes[1].value = "password";
    }
  }
}
