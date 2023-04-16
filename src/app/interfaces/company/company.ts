export interface Company {
  id: string,
  ownerFirstname: string,
  ownerLastname: string,
  companyName: string,
  email: string,
  typeOfCustomer: string,
  street?: string,
  zip?: string,
  city?: string,
  country?: string,
  phone: string
}
