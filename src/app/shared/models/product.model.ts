import { ICategory } from './category.model';

export interface IProduct {
  id?: string;
  name: string;
  category: ICategory | null;
  description: string;
  price: number | null;
  quantity: number | null;
  Images: IImage[];
  discount?: number | null;
  quantityCart?: number; // variável apra definir a quantidade de produtos no carrinho
}

export interface IImage {
  id: string;
  url: string;
}
