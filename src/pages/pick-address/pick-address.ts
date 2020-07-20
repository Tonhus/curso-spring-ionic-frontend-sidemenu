import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

items:EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
          id: "1",
          logradouro: "Rua Flores",
          numero: "300",
          complemento: "Apto 303",
          bairro: "Jardim",
          cep: "38220834",
          cidade: {
              id: "3170206",
              nome: "Uberlândia",
              estado: {
                  id: "31",
                  nome: "Minas Gerais",
                  sigla: "MG"
              }
          }
      },
      {
          id: "2",
          logradouro: "Avenida Matos",
          numero: "105",
          complemento: "Sala 800",
          bairro: "Centro",
          cep: "38777012",
          cidade: {
              id: "3550308",
              nome: "São Paulo",
              estado: {
                  id: "35",
                  nome: "São Paulo",
                  sigla: "SP"
              }
          }
      }]
  }

}
