import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../../models/category.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // REQS

  url = environment.apiUrl + '/categorys';

  get(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.url}/${id}`);
  }

  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.url}`);
  }

  create(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.url}`, category);
  }

  update(id: string, category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.url}/${id}`, category);
  }

  delete(id: string): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.url}/${id}`);
  }

  // TABLE FUNCTIONS
}
