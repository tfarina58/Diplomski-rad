import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Individual, Company} from "../../../interfaces/customer/customer";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {LegalInfoComponent} from "../legal-info/legal-info.component";
import {CompanyEstate, IndividualEstate} from "../../../interfaces/estate/estate";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, AfterViewInit {

  userForm: FormGroup | undefined;
  estateForm: FormArray | undefined;
  constructor(private formBuilder: FormBuilder,
              private mdb: MdbModalService,
              private toast: ToastrService) {}

  ngOnInit() {
    let res: Individual | Company | undefined = this.getUserInfo('company');
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

    let res2 = this.getUserEstate('company');
    if (!res2) {
      this.toast.error('We were not able to reach your estate\'s information from the server side. Please try again later.', "Error", { closeButton: true, timeOut: 4000, progressBar: true, progressAnimation: 'increasing', enableHtml: true, newestOnTop: true });
      return;
    }

    if (res2.length) {
      this.estateForm = new FormArray(Array<FormGroup>());

      for (let estate of res2) {
        let tmp: FormGroup | undefined;
        if (estate.typeOfEstate == 'individual') {
          estate = estate as IndividualEstate;
          tmp = this.formBuilder.group({
            id: new FormControl(estate.id, Validators.required),
            individualFirstName: new FormControl(estate.individualFirstName, Validators.required),
            individualLastName: new FormControl(estate.individualLastName, Validators.required),
            individualId: new FormControl(estate.individualId, Validators.required),
            typeOfEstate: new FormControl(estate.typeOfEstate, Validators.required),
            street: new FormControl(estate.street),
            zip: new FormControl(estate.zip),
            city: new FormControl(estate.city),
            country: new FormControl(estate.country),
            latitude: new FormControl(estate.coordinates.latitude),
            longitude: new FormControl(estate.coordinates.longitude)
          });
        } else if (estate.typeOfEstate == 'company') {
          estate = estate as CompanyEstate;
          tmp = this.formBuilder.group({
            id: new FormControl(estate.id, Validators.required),
            companyName: new FormControl(estate.id, Validators.required),
            companyId: new FormControl(estate.id, Validators.required),
            typeOfEstate: new FormControl(estate.typeOfEstate, Validators.required),
            street: new FormControl(estate.street),
            zip: new FormControl(estate.zip),
            city: new FormControl(estate.city),
            country: new FormControl(estate.country),
            latitude: new FormControl(estate.coordinates.latitude),
            longitude: new FormControl(estate.coordinates.longitude)
          });
        }

        if (tmp) this.estateForm.push(tmp);
      }
    }
    console.log(this.estateForm?.getRawValue());
  }

  ngAfterViewInit() {
    let elem = document.getElementById('body');
    if (elem) elem.removeAttribute(elem.attributes[0].localName);
  }

  getUserInfo(typeOfCustomer: string): Individual | Company | undefined {
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

  getUserEstate(typeOfEstate: string): Array<IndividualEstate> | Array<CompanyEstate> | undefined {
    if (typeOfEstate == 'individual')
      return [{
        id: '8c4289a297b9578dd296d04ad0ce596a',
        individualFirstName: 'Toni',
        individualLastName: 'Farina',
        individualId: '',
        typeOfEstate: typeOfEstate,
        street: 'Farini 10A',
        zip: '52463',
        city: 'Višnjan',
        country: 'HR',
        coordinates: {
          latitude: 48.13988,
          longitude: 13.77893
        }
      } as IndividualEstate];
    else if (typeOfEstate == 'company')
      return [{
        id: '8c4289a297b9578dd296d04ad0ce596a',
        companyName: 'DikinBaus',
        companyId: '',
        typeOfEstate: typeOfEstate,
        street: 'Farini 10A',
        zip: '52463',
        city: 'Višnjan',
        country: 'HR',
        coordinates: {
          latitude: 48.13988,
          longitude: 13.77893
        }
      } as CompanyEstate];
    else return undefined;
  }

  openDropdown() {
    let elem = document.getElementById('dropdown');
  }

  openImage() {
    this.mdb.open(LegalInfoComponent, {
      animation: true,
      backdrop: true
    })
  }

  changeImage() {

  }

  deleteImage() {

  }

  submit() {
    console.log(this.userForm?.getRawValue());
  }

}
