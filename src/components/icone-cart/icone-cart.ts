import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';
import { CartService } from '../../services/domain/cart.service';

@Component({
  selector: 'icone-cart',
  templateUrl: 'icone-cart.html'
})
export class IconeCartComponent {

  text: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService) {
  }
  
  isShow(){
    return this.cartService.total()>0;
  }

}
