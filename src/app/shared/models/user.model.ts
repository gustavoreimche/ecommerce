import { IAddress } from "./address.model";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: IAddress[];
  admin: boolean;
}
