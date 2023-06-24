import { Component } from '@angular/core';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private templateService: TemplateService) {}

  toggleNav() {
    this.templateService.toggleMenu();
  }
}
