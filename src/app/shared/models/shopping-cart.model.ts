import { IProduct } from './product.model';
import { IUser } from './user.model';

export interface IShoppingCart {
  id: string;
  user: IUser;
  total: number;
  products: IProduct[];
  expireDate: Date;
}
