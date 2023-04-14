import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NavigationService} from "../../../services/navigation/navigation.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerFormAsIndividual: FormGroup = this.formBuilder.group({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    birthday: new FormControl(''),
    email: new FormControl('', Validators.pattern('([-!#-\'*+/-9=?A-Z^-~]+(\\.[-!#-\'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+')),
    phoneprefix: new FormControl(''),
    phonenumber: new FormControl(''),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])),
    repeatPassword: new FormControl('', Validators.required)
  },() => {
    return this.equalPasswords();
  });
  registerFormAsCompany: FormGroup = this.formBuilder.group({
    companyName: new FormControl(''),
    email: new FormControl('', Validators.pattern('([-!#-\'*+/-9=?A-Z^-~]+(\\.[-!#-\'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+')),
    phoneprefix: new FormControl(''),
    phonenumber: new FormControl(''),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])),
    repeatPassword: new FormControl('', Validators.required)
  },() => {
    return this.equalPasswords();
  });

  chosenForm: boolean = true; // True for individual, false for company
  constructor(private formBuilder: FormBuilder,
              private navService: NavigationService) {}

  equalPasswords() {
    if (this.chosenForm) return (String(this.registerFormAsIndividual.controls['password'].value).localeCompare(String(this.registerFormAsIndividual.controls['repeatPassword'].value)) == 0);
    else return (String(this.registerFormAsCompany.controls['password'].value).localeCompare(String(this.registerFormAsCompany.controls['repeatPassword'].value)) == 0);
  }

  async submit() {
    let form: any;
    if (this.chosenForm) {
      form = this.registerFormAsIndividual.getRawValue();
      form['typeOfCustomer'] = 'individual';
    } else {
      form = this.registerFormAsCompany.getRawValue();
      form['typeOfCustomer'] = 'company';
    }
    console.log(form);
    await this.navService.navigateTo('/main');
  }

}
