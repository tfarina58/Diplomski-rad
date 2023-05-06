import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Individual} from "../../../interfaces/individual/individual";
import {Company} from "../../../interfaces/company/company";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, AfterViewInit {

  userForm: FormGroup | undefined = undefined;
  constructor(private formBuilder: FormBuilder,
              private toast: ToastrService) {}

  ngOnInit() {
    let res: Individual | Company | undefined = this.getUserInfo('individual');
    if (!res) {
      this.toast.error('We were not able to reach your information from the server side. Please try again later.', "Error", { closeButton: true, timeOut: 4000, progressBar: true, progressAnimation: 'increasing', enableHtml: true, newestOnTop: true });
      return;
    }

    if (res.typeOfCustomer == 'individual') {
      res = res as Individual;
      this.userForm = this.formBuilder.group({
        id: new FormControl(res.id, Validators.required),
        firstname: new FormControl(res.firstname, Validators.required),
        lastname: new FormControl(res.lastname, Validators.required),
        birthday: new FormControl(res.birthday, Validators.required),
        typeOfCustomer: new FormControl(res.typeOfCustomer, Validators.required),
        phone: new FormControl(res.phone),
        street: new FormControl(res.street),
        zip: new FormControl(res.zip),
        city: new FormControl(res.city),
        country: new FormControl(res.country),
        email: new FormControl(res.email, Validators.compose([Validators.required, Validators.pattern('([-!#-\'*+/-9=?A-Z^-~]+(\\.[-!#-\'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+')]))
      });
    } else if (res.typeOfCustomer == 'company') {
      res = res as Company;
      this.userForm = this.formBuilder.group({
        id: new FormControl(res.id, Validators.required),
        companyName: new FormControl(res.companyName, Validators.required),
        ownerFirstname: new FormControl(res.ownerFirstname, Validators.required),
        ownerLastname: new FormControl(res.ownerLastname, Validators.required),
        typeOfCustomer: new FormControl(res.typeOfCustomer, Validators.required),
        phone: new FormControl(res.phone),
        street: new FormControl(res.street),
        zip: new FormControl(res.zip),
        city: new FormControl(res.city),
        country: new FormControl(res.country),
        email: new FormControl(res.email, Validators.compose([Validators.required, Validators.pattern('([-!#-\'*+/-9=?A-Z^-~]+(\\.[-!#-\'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+')]))
      });
    }
    console.log(this.userForm?.getRawValue());
  }

  ngAfterViewInit() {
    let elem = document.getElementById('body');
    if (elem) elem.removeAttribute(elem.attributes[0].localName);
  }

  getUserInfo(typeOfCustomer: string) {
    if (typeOfCustomer == 'individual')
      return {
        id: '8c4289a297b9578dd296d04ad0ce596a',
        firstname: 'Toni',
        lastname: 'Farina',
        birthday: '1998-03-12',
        email: 'tfarina58@gmail.com',
        typeOfCustomer: typeOfCustomer,
        street: 'Farini 10A',
        zip: '52463',
        city: 'Višnjan',
        country: 'HR',
        phone: '+385994716110'
      } as Individual;
    else if (typeOfCustomer == 'company')
      return {
        id: '8c4289a297b9578dd296d04ad0ce596a',
        ownerFirstname: 'Toni',
        ownerLastname: 'Farina',
        companyName: 'DikinBaus',
        email: 'tfarina58@gmail.com',
        typeOfCustomer: typeOfCustomer,
        street: 'Farini 10A',
        zip: '52463',
        city: 'Višnjan',
        country: 'HR',
        phone: '+385994716110'
      } as Company;
    else return undefined;
  }

  submit() {
    console.log(this.userForm?.getRawValue());
  }

}
