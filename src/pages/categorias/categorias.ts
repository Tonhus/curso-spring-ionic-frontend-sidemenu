import { ImageBucketService } from './../../services/image-bucket.service';
import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  items: CategoriaDTO[];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public imageBucketService : ImageBucketService) {
  }

  ionViewDidLoad() {

    this.categoriaService.findAll().subscribe(
      response => {
        this.items = response;
        this.loadImageUrls();
      },
      error => { }
    );
  }

  loadImageUrls() {
    this.imageBucketService.loadImageUrls(this.items,this.imageBucketService.categoriaPrefix);
  }

  showProdutos(categoria_id: string) {
    this.navCtrl.push("ProdutosPage", { categoria_id: categoria_id });
  }

}
