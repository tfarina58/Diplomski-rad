import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Individual, Company} from "../../../interfaces/user/user";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MdbModalService} from "mdb-angular-ui-kit/modal";
import {CompanyEstate, IndividualEstate} from "../../../interfaces/estate/estate";
import {FullscreenImageComponent} from "../../../components/fullscreen-image/fullscreen-image.component";
import {ReqresService} from "../../../services/reqres/reqres.service";
import {StorageService} from "../../../services/storage/storage.service";
import {PopUpService} from "../../../services/pop-up/pop-up.service";
import {NavigationService} from "../../../services/navigation/navigation.service";

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
              private popup: PopUpService,
              private navService: NavigationService,
              private toast: ToastrService,
              private reqres: ReqresService,
              private storage: StorageService) {}

  ngOnInit() {
    this.popup.showLoadingScreen();
    let res: Individual | Company | undefined = this.storage.getUserInfo();
    if (!res) {
      this.toast.error('We were not able to reach your information from the server side. Please try again later.', "Error", { closeButton: true, timeOut: 4000, progressBar: true, progressAnimation: 'increasing', enableHtml: true, newestOnTop: true });
      return;
    }

    if (res.typeOfUser == 'individual') {
      res = res as Individual;
      this.userForm = this.formBuilder.group({
        id: new FormControl(res.id, Validators.required),
        firstname: new FormControl(res.firstname, Validators.required),
        lastname: new FormControl(res.lastname, Validators.required),
        birthday: new FormControl(res.birthday, Validators.required),
        image: new FormControl(res.image ? res.image : 'assets/images/user.jpg', Validators.required),
        typeOfUser: new FormControl(res.typeOfUser, Validators.required),
        phone: new FormControl(res.phone),
        street: new FormControl(res.street),
        zip: new FormControl(res.zip),
        city: new FormControl(res.city),
        country: new FormControl(res.country),
        email: new FormControl(res.email, Validators.compose([Validators.required, Validators.pattern('([-!#-\'*+/-9=?A-Z^-~]+(\\.[-!#-\'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+')]))
      });
    } else if (res.typeOfUser == 'company') {
      res = res as Company;
      this.userForm = this.formBuilder.group({
        id: new FormControl(res.id, Validators.required),
        companyName: new FormControl(res.companyName, Validators.required),
        ownerFirstname: new FormControl(res.ownerFirstname, Validators.required),
        ownerLastname: new FormControl(res.ownerLastname, Validators.required),
        image: new FormControl(res.image ? res.image : 'assets/images/user.jpg', Validators.required),
        typeOfUser: new FormControl(res.typeOfUser, Validators.required),
        phone: new FormControl(res.phone),
        street: new FormControl(res.street),
        zip: new FormControl(res.zip),
        city: new FormControl(res.city),
        country: new FormControl(res.country),
        email: new FormControl(res.email, Validators.compose([Validators.required, Validators.pattern('([-!#-\'*+/-9=?A-Z^-~]+(\\.[-!#-\'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+')]))
      });
    }

    let res2 = this.storage.getUserEstates();
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
    this.popup.dismissLoadingScreen();
  }

  ngAfterViewInit() {
    let elem = document.getElementById('body');
    if (elem) elem.removeAttribute(elem.attributes[0].localName);

    let image = document.getElementById(this.userForm?.controls['typeOfUser'].value + 'Image') as any;
    if (!image) return;

    image.src = this.userForm?.controls['image'].value;
  }

  openDropdown() {
    // let elem = document.getElementById('dropdown');
  }

  firstCapital(value: string): string {
    return value[0].toUpperCase() + value.substring(1, value.length);
  }

  openImage() {
    this.mdb.open(FullscreenImageComponent, {
      animation: true,
      backdrop: true,
      // data: {image: this.userForm?.controls['image'].value} TODO
    });
    localStorage.setItem('image', this.userForm?.controls['image'].value);

  }

  changeImage() {
    let imageInput = document.getElementById('select' + this.firstCapital(this.userForm?.controls['typeOfUser'].value) + 'Image') as any;
    if (!imageInput) return;

    let selectedFile = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      let image = document.getElementById(this.userForm?.controls['typeOfUser'].value + 'Image') as any;
      if (!image) return;

      image.src = String(reader.result);
      this.userForm?.controls['image'].setValue(reader.result);
    });
    reader.readAsDataURL(selectedFile);
  }

  deleteImage() {
    let image = document.getElementById(this.userForm?.controls['typeOfUser'].value + 'Image') as any;
    if (!image) return;

    image.src = String('assets/images/user.jpg');
    this.userForm?.controls['image'].setValue('assets/images/user.jpg');
  }

  areYourSure() {
    this.popup.showAlert("Are you sure?", "You are about to permanently delete your account");
  }

  async deleteProfile() {
    // Valid data submitted
    await this.popup.showLoadingScreen();
    const res = await this.reqres.deleteAccount();
    if (!res.success) {
      this.popup.showErrorToast("There seems to be a problem with the login. Please try again later.");
      return;
    }

    this.popup.showSuccessToast("You successfully delete your account!");
    await this.navService.navigateTo('/home');
    this.popup.dismissLoadingScreen();
  }

  async submit() {
    let rawForm = this.userForm?.getRawValue();
    if (this.userForm?.controls['image'].value == 'assets/images/user.jpg') delete rawForm.image;
    console.log(rawForm);
    await this.popup.showLoadingScreen();
    let res = await this.reqres.editUserInfo(rawForm);
    if (!res.success) this.popup.showErrorToast("There seems to be an error while trying to edit your info. Please try again later.");
    else this.popup.showSuccessToast("You successfully updated your info!");
    this.popup.dismissLoadingScreen();

  }

}
