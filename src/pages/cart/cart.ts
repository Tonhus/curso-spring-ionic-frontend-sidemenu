import { ProdutoService } from './../../services/domain/produto.service';
import { CartService } from './../../services/domain/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoDTO } from '../../models/produto.dto';
import { ImageBucketService } from '../../services/image-bucket.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService, public produtoService: ProdutoService,
    public imageBucketService: ImageBucketService) {
  }

  ionViewDidLoad() {
    this.items = this.cartService.getCart().items;

  }

  loadImageUrls() {
    this.imageBucketService.loadImageUrls(this.items, this.imageBucketService.produtoPrefix);
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

  goOn() {
    this.navCtrl.push('CategoriasPage');
  }

  checkout() {
    this.navCtrl.push('PickAddressPage');
  }

  showDetail(produto_id: string) {
    this.navCtrl.push("ProdutoDetailPage", { produto_id: produto_id });
  }

}
