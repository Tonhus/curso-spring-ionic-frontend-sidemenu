import { ViaCepService } from './../../services/domain/viaCep.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViaCepDTO } from '../../models/viacep.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  items: any;

  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  endereco: ViaCepDTO;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public viaCepService: ViaCepService, public alertController: AlertController) {
    this.formGroup = formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['10828333', [Validators.required]],
      telefone1: ['977261827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.viaCepService.getEstados().subscribe(
      response => {
        this.estados = response;
        this.estados.sort((a, b) => a.nome.localeCompare(b.nome));
        const estado: EstadoDTO = this.estados.find(element => element.sigla == 'MG');
        console.log(estado);
        this.formGroup.controls.estadoId.setValue(estado.id);
        this.updateCidades();
      },
      error => { }
    );


  }

  signupUser() {
    console.log("Enviou o cadastro")
  }

  updateEndereco() {

    this.viaCepService.getEndereco(this.formGroup.controls['cep'].value).subscribe(
      response => {
        if (!response.erro) {
          this.endereco = response;
          this.formGroup.controls['logradouro'].setValue(this.endereco.logradouro);
          this.formGroup.controls['bairro'].setValue(this.endereco.bairro);
          const estado: EstadoDTO = this.estados.find(element => element.sigla == this.endereco.uf);
          this.formGroup.controls['estadoId'].setValue(estado.id);
          this.updateCidades(estado.id);
        }
      },
      error => {
        console.log(error);
      }
    );

  }
  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    if (this.endereco) {
      let cidade_cep = this.endereco.localidade;
    }
    this.viaCepService.getCidades(estado_id).subscribe(
      response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
        this.cidades.sort((a, b) => a.nome.localeCompare(b.nome));
        const cidade: CidadeDTO = this.cidades.find(element => element.nome == cidade_cep);
        if (cidade) {
          this.formGroup.controls['cidadeId'].setValue(cidade.id);
        } else {
          this.formGroup.controls['cidadeId'].setValue(null);
        }
      },
      error => { }
    );
  }




}
