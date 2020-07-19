import { CartService } from './../../services/domain/cart.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item : ProdutoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService:CartService) {
  }

  ionViewDidLoad() {
    let produtoId = this.navParams.get('produto_id');
    this.produtoService.findById(produtoId).subscribe(
      response => {
        this.item = response;
        this.produtoService.getImageFromBucket(this.item.id).subscribe(
          response => {
            this.item.imageUrl = this.produtoService.getSmallImageUrl(this.item.id);
          },
          error => {}
        );
      },
      error => { }
    );
  }


  addToCart(produto:ProdutoDTO){
    this.cartService.addProduto(produto);
    this.navCtrl.push('CartPage')
  }

}
