import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobileService } from 'src/app/shared/services/mobile/mobile.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(public router: Router, public mobile: MobileService) {}
  isMobile = false;

  ngOnInit(): void {
    this.mobile.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
