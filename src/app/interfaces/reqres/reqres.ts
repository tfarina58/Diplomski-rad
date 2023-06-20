import {Company, Individual} from "../user/user";
import {CompanyEstate, IndividualEstate} from "../estate/estate";
export interface UserRes {
  success: boolean, // If request sending and response obtaining was successful
  user?: Individual | Company | undefined,
  estates?: (IndividualEstate | CompanyEstate)[] | undefined
}

export interface SessionRes {
  success: boolean, // If request sending and response obtaining was successful
  session?: boolean // Is the session still active or not
}
