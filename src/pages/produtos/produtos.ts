import { CategoriaService } from './../../services/domain/categoria.service';
import { CategoriaDTO } from './../../models/categoria.dto';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageBucketService } from '../../services/image-bucket.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  items: ProdutoDTO[];
  categoria: CategoriaDTO;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public categoriaService: CategoriaService,
    public imageBucketService: ImageBucketService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');

    this.categoriaService.findById(categoria_id).subscribe(
      response => {
        this.categoria = response;
      },
      error => { }
    );

    this.produtoService.findByCategoria(categoria_id).subscribe(
      response => {
        this.items = response['content'];
        this.loadImageUrls();
      },
      error => { }
    );
  }


  loadImageUrls() {
    this.imageBucketService.loadImageUrls(this.items, this.imageBucketService.produtoPrefix);
  }

  showDetail(produto_id: string) {
    this.navCtrl.push("ProdutoDetailPage", { produto_id: produto_id });
  }

}
