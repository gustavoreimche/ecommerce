import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICartItem } from '../../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  constructor(private http: HttpClient) {}

  // REQS

  url = environment.apiUrl + '/cartItems';

  getAll(): Observable<ICartItem[]> {
    return this.http.get<ICartItem[]>(`${this.url}`);
  }

  getById(id: string): Observable<ICartItem> {
    return this.http.get<ICartItem>(`${this.url}/${id}`);
  }

  create(cartItem: ICartItem): Observable<ICartItem> {
    return this.http.post<ICartItem>(`${this.url}`, cartItem);
  }

  update(id: string, cartItem: ICartItem): Observable<ICartItem> {
    return this.http.put<ICartItem>(`${this.url}/${id}`, cartItem);
  }

  delete(id: string): Observable<ICartItem> {
    return this.http.delete<ICartItem>(`${this.url}/${id}`);
  }

  increment(id: string): Observable<ICartItem> {
    return this.http.patch<ICartItem>(`${this.url}/increment/${id}`, {});
  }

  decrement(id: string): Observable<ICartItem> {
    return this.http.patch<ICartItem>(`${this.url}/decrement/${id}`, {});
  }
}
