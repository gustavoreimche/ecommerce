import { ICartItem } from './cart-item.model';
import { IUser } from './user.model';

export interface IShoppingCart {
  _id?: string;
  user?: IUser;
  total?: number;
  cartItems?: ICartItem[];
  expireDate?: Date;
}
