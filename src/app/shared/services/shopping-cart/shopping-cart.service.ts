import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IShoppingCart } from '../../models/shopping-cart.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private http: HttpClient) {}

  // REQS

  url = environment.apiUrl + '/shoppingCarts';

  getAll(): Observable<IShoppingCart[]> {
    return this.http.get<IShoppingCart[]>(this.url);
  }

  getById(id: string): Observable<IShoppingCart> {
    return this.http.get<IShoppingCart>(this.url + '/' + id);
  }

  create(): Observable<IShoppingCart> {
    return this.http.post<IShoppingCart>(this.url, {});
  }

  update(id: string, data: IShoppingCart): Observable<IShoppingCart> {
    return this.http.put<IShoppingCart>(this.url + '/' + id, data);
  }

  delete(id: string): Observable<IShoppingCart> {
    return this.http.delete<IShoppingCart>(this.url + '/' + id);
  }
}
