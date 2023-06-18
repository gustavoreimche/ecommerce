import { Component } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [autohide]="true"
      [delay]="toast.delay || 3500"
      (hiddden)="toastService.remove(toast)"
      [class]="toast.class"
    >
      <div
        class="flex justify-between fw-bold text-uppercase"
        style="white-space: pre-wrap;"
      >
        {{ toast.msg }}
        <button (click)="toastService.remove(toast)">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </ngb-toast>
  `,
  styles: [
    `
      :host {
        position: fixed;
        top: 56px;
        right: 0;
        margin: 16px;
        z-index: 1200;
      }
    `,
  ],
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}
}
