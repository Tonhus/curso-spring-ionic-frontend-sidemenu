import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  items : ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [ 
      {id:"1",nome:"Teste 1",preco:189.99 },
      {id:"2",nome:"Teste 2",preco:289.99 },
      {id:"3",nome:"Teste 3",preco:389.99 },
      {id:"4",nome:"Teste 4",preco:489.99 },
      {id:"5",nome:"Teste 5",preco:589.99 },
      {id:"6",nome:"Teste 6",preco:689.99 },

    ]
  }


}
