export interface Company {
  id: string,
  ownerFirstname: string,
  ownerLastname: string,
  companyName: string,
  email: string,
  image?: string | File,
  typeOfUser: string,
  street?: string,
  zip?: string,
  city?: string,
  country?: string,
  phone: string,
  password?: string
}

export interface Individual {
  id: string,
  firstname: string,
  lastname: string,
  birthday: string,
  email: string,
  image?: string | File,
  typeOfUser: string,
  street?: string,
  zip?: string,
  city?: string,
  country?: string,
  phone?: string
  password?: string
}

export interface Admin {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  image?: File,
  typeOfUser: string,
  phone?: string
  password?: string
}
