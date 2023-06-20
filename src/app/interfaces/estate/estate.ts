export interface CompanyEstate {
  name: string,
  id: string,
  companyId: string,
  typeOfEstate: string,
  image: string,
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
  name: string,
  id: string,
  individualId: string,
  typeOfEstate: string,
  image: string,
  street: string,
  zip: string,
  city: string,
  country: string,
  coordinates: {
    latitude: number,
    longitude: number
  }
  phone: string
}
