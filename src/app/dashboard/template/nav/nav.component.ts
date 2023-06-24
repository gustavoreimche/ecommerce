import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobileService } from 'src/app/shared/services/mobile/mobile.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TemplateService } from '../template.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('slideDown', [
      state(
        'closed',
        style({
          height: '0',
          opacity: '0',
        })
      ),
      state(
        'open',
        style({
          height: '*',
          opacity: '1',
        })
      ),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
    trigger('slideRight', [
      state(
        'open',
        style({
          left: '0',
        })
      ),
      state(
        'closed',
        style({
          left: '-256px',
        })
      ),
      transition('open <=> closed', [animate('0.3s')]),
    ]),
    trigger('contentDesk', [
      state(
        'open',
        style({
          left: '256px',
        })
      ),
      state(
        'closed',
        style({
          left: '0',
          width: '100vw',
        })
      ),
      transition('open <=> closed', [animate('0.3s')]),
    ]),
  ],
})
export class NavComponent implements OnInit {
  constructor(
    public router: Router,
    public mobile: MobileService,
    public templateService: TemplateService
  ) {}

  isMobile = false;

  ngOnInit(): void {
    this.mobile.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
      isMobile
        ? (this.templateService.navOpen = false)
        : (this.templateService.navOpen = true);
    });
  }

  openSubNavProducts = false;

  toogleSubNav() {
    this.openSubNavProducts = !this.openSubNavProducts;
  }

  closeSubNav() {
    this.openSubNavProducts = false;
  }

  botaoAtivo = ''; // Inicialmente nenhum botão está ativo

  // Função para definir o botão ativo
  definirBotaoAtivo(botao: string) {
    this.botaoAtivo = botao;
  }
}
