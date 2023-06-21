import { IProduct } from './product.model';

export interface ICartItem {
  _id?: string;
  idShoppingCart?: string;
  product?: IProduct;
  quantity?: number;
}
