import { IDelivery } from './delivery.model';
import { IPayment } from './payment.model';
import { IShoppingCart } from './shopping-cart.model';
import { IUser } from './user.model';

export interface IOrder {
  id: string;
  shoppingCart: IShoppingCart;
  user: IUser;
  delivery: IDelivery;
  paymentStatus: boolean;
  total: number;
  status: string;
  orderDate: Date;
  payment: IPayment;
}
