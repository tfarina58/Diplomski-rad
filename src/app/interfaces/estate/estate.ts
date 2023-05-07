export interface CompanyEstate {
  id: string,
  companyName: string,
  companyId: string,
  typeOfEstate: string,
  street: string,
  zip: string,
  city: string,
  country: string,
  coordinates: {
    latitude: number,
    longitude: number
  }
}

export interface IndividualEstate {
  id: string,
  individualFirstName: string,
  individualLastName: string,
  individualId: string,
  typeOfEstate: string,
  street: string,
  zip: string,
  city: string,
  country: string,
  coordinates: {
    latitude: number,
    longitude: number
  }
}
