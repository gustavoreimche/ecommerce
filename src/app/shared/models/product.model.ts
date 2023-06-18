import { ICategory } from './category.model';

export interface IProduct {
  id?: string;
  name: string;
  category: ICategory;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
