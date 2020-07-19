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
    public categoriaService: CategoriaService) {
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
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.categoriaService.getImageFromBucket(item.id).subscribe(
        response => {
          item.imageUrl = this.categoriaService.getImageUrl(item.id);
        },
        error => { }
      );
    }
  }

  showProdutos(categoria_id: string) {
    this.navCtrl.push("ProdutosPage", { categoria_id: categoria_id });
  }

}
