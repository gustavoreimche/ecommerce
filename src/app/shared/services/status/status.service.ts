import { IStatus } from './../../models/status.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}

  url = environment.apiUrl + '/status';

  getAll(): Observable<IStatus[]> {
    return this.http.get<IStatus[]>(this.url);
  }

  create(status: IStatus): Observable<IStatus> {
    return this.http.post<IStatus>(this.url, status);
  }

  update(id: string, status: IStatus): Observable<IStatus> {
    return this.http.put<IStatus>(`${this.url}/${id}`, status);
  }

  getById(id: string): Observable<IStatus> {
    return this.http.get<IStatus>(`${this.url}/${id}`);
  }

  delete(id: string): Observable<IStatus> {
    return this.http.delete<IStatus>(`${this.url}/${id}`);
  }
}
