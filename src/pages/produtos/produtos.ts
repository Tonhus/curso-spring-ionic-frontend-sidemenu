import { ProdutosService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  items: ProdutoDTO[];

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtosService: ProdutosService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.produtosService.findByCategoria(categoria_id).subscribe(
      response => {
        this.items = response['content'];
        this.items.forEach(element => {
          if (element.imageUrl == null) {
            this.getImageIfExists(element);
          }
        });
        console.log(this.items);
      },
      error => { }
    );
  }

  getImageIfExists(produtoDto: ProdutoDTO) {
    produtoDto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${produtoDto.id}.jpg`
  }


}
