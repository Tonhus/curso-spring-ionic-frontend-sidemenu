import { ProdutoService } from './../../services/domain/produto.service';
import { CartService } from './../../services/domain/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService, public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.items = this.cartService.getCart().items;

  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i].produto;
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(
        response => {
          item.imageUrl = this.produtoService.getSmallImageUrl(item.id);
        },
        error => { }
      );
    }
  }

  removeProduto(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total(): number {
    return this.cartService.total();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriasPage');
  }

}
