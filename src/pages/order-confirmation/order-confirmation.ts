import { PedidoService } from './../../services/domain/pedido.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { ClienteDTO } from './../../models/cliente.dto';
import { CartService } from './../../services/domain/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { PedidoDTO } from '../../models/pedido.dto';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  pedidoId: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = response["enderecos"].find(x => x.id == this.pedido.enderecoDeEntrega.id);

      }, error => {
        this.navCtrl.setRoot("HomePage");
      });
  }

  total(): number {
    return this.cartService.total();
  }

  checkout() {
    this.pedidoService.insert(this.pedido).subscribe(
      response => {
        console.log(response.headers.get('location'));
        this.pedidoId = this.extractId(response.headers.get('location'));
        this.cartService.createOrClearCart();
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      }
    );
  }
  
  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  private extractId(location : string){
    let position = location.lastIndexOf('/');
    return location.substring(position+1);
  }
}
