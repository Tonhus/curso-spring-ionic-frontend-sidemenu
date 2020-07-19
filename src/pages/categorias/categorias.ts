import { API_CONFIG } from './../../config/api.config';
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
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(
      response => {
        this.items = response;
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

  callback(response) {
    console.log(response);
  }

  getImageIfExists(categoriaDto: CategoriaDTO) {
    categoriaDto.imageUrl = `${API_CONFIG.bucketBaseUrl}/cat${categoriaDto.id}.jpg`
  }

showProdutos(){
  this.navCtrl.push("ProdutosPage");
}

}
