import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReloadService {
  private reloadSubject = new Subject<void>();

  reload$ = this.reloadSubject.asObservable();

  reload() {
    this.reloadSubject.next();
  }
}
