import { CategoriaService } from './../../services/domain/categoria.service';
import { CategoriaDTO } from './../../models/categoria.dto';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImageBucketService } from '../../services/image-bucket.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  items: ProdutoDTO[] = [];
  categoria: CategoriaDTO;
  page: number = 0;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public categoriaService: CategoriaService,
    public imageBucketService: ImageBucketService,
    public loadingControler: LoadingController) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');

    this.categoriaService.findById(categoria_id).subscribe(
      response => {
        this.categoria = response;
      },
      error => { }
    );
    this.loadData();
  }

  loadData() {
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(
        response => {
          let tempItems = response['content'];
          this.items = this.items.concat(tempItems);
          this.loadImageUrls(tempItems);
          loader.dismiss();
        },
        error => {
          loader.dismiss();
        }
      );
  }


  loadImageUrls(items) {
    this.imageBucketService.loadImageUrls(items, this.imageBucketService.produtoPrefix);
  }

  showDetail(produto_id: string) {
    this.navCtrl.push("ProdutoDetailPage", { produto_id: produto_id });
  }

  presentLoading() {
    let loading = this.loadingControler.create({
      content: 'Aguarde...'
    });
    loading.present();
    return loading;
  }

  doRefresh(event) {
    this.page = 0;
    this.items = []
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 500);
  }

  doInfinite(event) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 500);
  }


}
