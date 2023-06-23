import { Injectable } from '@angular/core';
import {Company, Individual} from "../../interfaces/user/user";
import {CompanyEstate, IndividualEstate} from "../../interfaces/estate/estate";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  customer: Individual | Company | undefined = {
    id: '8c4289a297b9578dd296d04ad0ce596a',
    firstname: 'Toni',
    lastname: 'Farina',
    birthday: '1998-03-12',
    email: 'tfarina58@gmail.com',
    typeOfUser: "individual",
    street: 'Farini 10A',
    zip: '52463',
    city: 'Višnjan',
    country: 'HR',
    image: '',
    phone: '+385994716110'
  } as Individual;

  /*user: Individual | Company | undefined = {
    id: '8c4289a297b9578dd296d04ad0ce596a',
    ownerFirstname: 'Toni',
    ownerLastname: 'Farina',
    companyName: 'DikinBaus',
    email: 'tfarina58@gmail.com',
    typeOfUser: "company",
    street: 'Farini 10A',
    zip: '52463',
    city: 'Višnjan',
    country: 'HR',
    image: '',
    phone: '+385994716110'
  } as Company;*/
  estates: Set<IndividualEstate | CompanyEstate> | undefined = new Set<IndividualEstate | CompanyEstate>([
    {
      name: 'Villa Farini',
      id: '8c4289a297b9578dd296d04ad0ce596a',
      individualId: '',
      typeOfEstate: "individual",
      street: 'Farini 10A',
      zip: '52463',
      city: 'Višnjan',
      country: 'HR',
      image: 'assets/images/villa1.jpg',
      coordinates: {
        latitude: 48.13988,
        longitude: 13.77893
      },
      phone: '+385994716110'
    } as IndividualEstate, {
      name: 'Villa Farini 2.0',
      id: '8c4289a297b9578dd296d04ad0ce596a',
      individualId: '',
      typeOfEstate: "individual",
      street: 'Farini 10A',
      zip: '52463',
      city: 'Višnjan',
      country: 'HR',
      image: 'assets/images/villa2.jpg',
      coordinates: {
        latitude: 48.13988,
        longitude: 13.77893
      },
      phone: '+385994716110'
    } as IndividualEstate, {
      name: 'Villa Farini 3.0',
      id: '8c4289a297b9578dd296d04ad0ce596a',
      individualId: '',
      typeOfEstate: "individual",
      street: 'Farini 10A',
      zip: '52463',
      city: 'Višnjan',
      country: 'HR',
      image: 'assets/images/villa3.jpeg',
      coordinates: {
        latitude: 48.13988,
        longitude: 13.77893
      },
      phone: '+385994716110'
    } as IndividualEstate, {
      name: 'Villa Farini 3.0',
      id: '8c4289a297b9578dd296d04ad0ce596a',
      individualId: '',
      typeOfEstate: "individual",
      street: 'Farini 10A',
      zip: '52463',
      city: 'Višnjan',
      country: 'HR',
      image: 'assets/images/villa4.jpg',
      coordinates: {
        latitude: 48.13988,
        longitude: 13.77893
      },
      phone: '+385994716110'
    } as IndividualEstate, {
      name: 'Villa Farini 3.0',
      id: '8c4289a297b9578dd296d04ad0ce596a',
      individualId: '',
      typeOfEstate: "individual",
      street: 'Farini 10A',
      zip: '52463',
      city: 'Višnjan',
      country: 'HR',
      image: 'assets/images/villa2.jpg',
      coordinates: {
        latitude: 48.13988,
        longitude: 13.77893
      },
      phone: '+385994716110'
    } as IndividualEstate
  ]);

  /*estates: [IndividualEstate] | [CompanyEstate] | undefined = [{
    id: '8c4289a297b9578dd296d04ad0ce596a',
    companyId: '',
    name: 'Villa Farina'
    typeOfEstate: "company",
    street: 'Farini 10A',
    zip: '52463',
    city: 'Višnjan',
    country: 'HR',
    image: '',
    coordinates: {
      latitude: 48.13988,
      longitude: 13.77893
    },
    phone: '+385994716110'
  } as CompanyEstate];*/

  constructor() { }
  getUserInfo(): Individual | Company | undefined {
    return this.customer;
  }
  setUserInfo(customer: Individual | Company | undefined) {
    this.customer = customer;
  }
  getUserEstates(): (IndividualEstate | CompanyEstate)[] | undefined {
    if (!this.estates?.size) return undefined;

    let array: (IndividualEstate | CompanyEstate)[] = [];
    this.estates?.forEach(value => array.push(value));
    return array;
  }
  setUserEstates(estates: (IndividualEstate | CompanyEstate)[] | undefined) {
    this.estates = undefined;
    if (estates?.length) this.estates = new Set<IndividualEstate | CompanyEstate>(estates);
  }

  addEstate(estate: IndividualEstate | CompanyEstate) {
    this.estates?.add(estate);
  }

  editEstate(oldEstate: IndividualEstate | CompanyEstate, newEstate: IndividualEstate | CompanyEstate) {
    console.log("Before: ", this.estates);
    this.estates?.forEach((elem) => {
      if (elem.id == oldEstate.id) {
        elem = newEstate;
      }
    });
    console.log("After: ", this.estates);
  }

  removeEstate(estate: IndividualEstate | CompanyEstate) {
    this.estates?.delete(estate);
  }
}
