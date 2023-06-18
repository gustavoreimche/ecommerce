import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  sucess(msg: string) {
    this.toasts.push({ msg, class: 'bg-success text-light' });
  }
  error(msg: string) {
    this.toasts.push({ msg, class: 'bg-danger text-light' });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t != toast);
  }
}
