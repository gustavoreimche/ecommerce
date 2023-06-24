import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  navOpen = true;

  toggleMenu(): void {
    this.navOpen = !this.navOpen;
  }
}
