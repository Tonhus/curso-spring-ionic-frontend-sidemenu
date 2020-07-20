import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO;
  parcelas: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  formGroup: FormGroup;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public formBuilder: FormBuilder, 
    public cartService: CartService) {

    this.pedido = this.navParams.get('pedido');

    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [10, Validators.required],
      "@type": ["pagamentoComBoleto", Validators.required]
    });
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    this.navCtrl.setRoot("OrderConfirmationPage", { pedido: this.pedido });
  }

  total(): number {
    return this.cartService.total();
  }
}
