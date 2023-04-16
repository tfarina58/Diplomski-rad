export interface Individual {
  id: string,
  firstname: string,
  lastname: string,
  birthday: string,
  email: string,

  typeOfCustomer: string,
  street?: string,
  zip?: string,
  city?: string,
  country?: string,
  phone?: string
}
