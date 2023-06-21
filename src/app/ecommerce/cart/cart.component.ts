import { Component, OnInit } from '@angular/core';
import { IShoppingCart } from 'src/app/shared/models/shopping-cart.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.load();
  }

  shoppingCart: IShoppingCart = {};

  load(): void {
    const id = localStorage.getItem('idShoppingCart') ?? '';
    this.shoppingCartService.getById(id).subscribe((shoppingCart) => {
      this.shoppingCart = shoppingCart;
      console.log(shoppingCart);
    });
  }
}
