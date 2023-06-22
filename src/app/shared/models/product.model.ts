import { ICategory } from './category.model';

export interface IProduct {
  _id?: string;
  name: string;
  category: ICategory | null;
  description: string;
  price: number | null;
  quantity: number | null;
  imageUrl: string[];
  discount?: number | null;
  quantityCart?: number; // variável apra definir a quantidade de produtos no carrinho
}
