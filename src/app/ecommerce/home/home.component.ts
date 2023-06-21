import { ProductService } from 'src/app/shared/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { ICartItem } from 'src/app/shared/models/cart-item.model';
import { IShoppingCart } from 'src/app/shared/models/shopping-cart.model';
import { CartItemService } from 'src/app/shared/services/cart-item/cart-item.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';

@Component({
  selector: 'app-home-ecommerce',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeEcommerceComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartItemService: CartItemService,
    private shoppingCartService: ShoppingCartService,
    private toast: ToastService
  ) {}

  products: IProduct[] = [];
  cartItem: ICartItem = {};
  shoppingCart: IShoppingCart = {};

  ngOnInit() {
    this.productService.getAll().subscribe((products) => {
      products.map((product) => {
        product.quantityCart = 1;
      });
      this.products = products;
    });

    this.load();
  }

  incraseQuantity(id: string) {
    this.products.map((product) => {
      if (product._id === id) {
        product.quantityCart
          ? (product.quantityCart += 1)
          : (product.quantityCart = 1);
      }
    });
  }

  dicraseQuantity(id: string) {
    this.products.map((product) => {
      if (product._id === id) {
        product.quantityCart
          ? (product.quantityCart -= 1)
          : (product.quantityCart = 1);
      }
    });
  }

  addToCart(product: IProduct) {
    console.log(product);
    // se existir um carrinho de compras
    if (localStorage.getItem('idShoppingCart')) {
      this.toast.sucess('Carrinho já existe');
      this.cartItem = {
        idShoppingCart: localStorage.getItem('idShoppingCart') as string,
        product: product,
        quantity: product.quantityCart,
      };
      this.cartItemService.create(this.cartItem).subscribe((cartItem) => {
        this.toast.sucess('Produto adicionado com sucesso');
        console.log(cartItem);
        this.cartItem = {};
        this.load();
      });

      // se não existe um carrinho de compras
    } else {
      this.shoppingCartService.create().subscribe((shoppingCart) => {
        this.shoppingCart = shoppingCart;
        this.toast.sucess(shoppingCart._id as string);
        localStorage.setItem('idShoppingCart', shoppingCart._id as string);
        this.cartItem = {
          idShoppingCart: this.shoppingCart._id,
          product: product,
          quantity: product.quantityCart,
        };

        this.cartItemService.create(this.cartItem).subscribe((cartItem) => {
          this.toast.sucess('Produto adicionado com sucesso');
          console.log(cartItem);
          this.cartItem = {};
          this.load();
        });
      });
    }
  }

  load(): void {
    const id = localStorage.getItem('idShoppingCart') ?? '';
    this.shoppingCartService.getById(id).subscribe((shoppingCart) => {
      this.shoppingCart = shoppingCart;
      console.log(shoppingCart);
    });
  }

  dicraseCartItemFromShoppingCart(id: string, cartItem: ICartItem): void {
    cartItem.quantity ? (cartItem.quantity -= 1) : (cartItem.quantity = 1);
    this.cartItemService.update(id, cartItem).subscribe(() => {
      this.toast.sucess('Produto atualizado com sucesso');
    });
  }
  incraseCartItemFromShoppingCart(id: string, cartItem: ICartItem): void {
    cartItem.quantity ? (cartItem.quantity += 1) : (cartItem.quantity = 1);
    this.cartItemService.update(id, cartItem).subscribe(() => {
      this.toast.sucess('Produto atualizado com sucesso');
    });
  }
}
