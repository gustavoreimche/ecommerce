import { IProduct } from 'src/app/shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  isEdit = false;
  id = '';
  product!: IProduct;

  url = environment.apiUrl + '/products';

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.url, product);
  }

  update(id: string, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.url}/${id}`, product);
  }

  delete(id: string): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.url}/${id}`);
  }

  getById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }
}
