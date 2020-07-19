import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { ClienteNewDTO } from './../../models/cliente.new.dto';
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
  templateUrl: 'signup.html'
})
export class SignupPage {
  formGroup: FormGroup;
  items: any;

  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  endereco: ViaCepDTO;
  cpfOuCnpjLabel: string;
  cpfOuCnpjMask: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public viaCepService: ViaCepService, public alertController: AlertController, public cidadeService: CidadeService, public estadoService: EstadoService) {
    this.formGroup = formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      senhaConfirm: ['123', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['34700070', [Validators.required]],
      telefone1: ['03134596280', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    }, { validator: SignupPage.passwordsMatch });
    this.updateCpfOuCnpj();
    this.formGroup.controls.cpfOuCnpj.setValue('06134596280');
  }

  static passwordsMatch(cg: FormGroup): { [err: string]: any } {
    let pwd1 = cg.controls.senha.value;
    let pwd2 = cg.controls.senhaConfirm.value;
    let rv: { [error: string]: any } = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv['passwordMismatch'] = true;
    }
    return rv;
  }


  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(
      response => {
        this.estados = response;
        this.estados.sort((a, b) => a.nome.localeCompare(b.nome));
        const estado: EstadoDTO = this.estados.find(element => element.sigla == 'MG');
        this.formGroup.controls.estadoId.setValue(estado.id);
        this.updateCidades();
      },
      error => { }
    );


  }

  signupUser() {
    let clienteNewDTO: ClienteNewDTO = {
      nome: this.formGroup.controls.nome.value,
      email: this.formGroup.controls.email.value,
      cpfOuCnpj: this.formGroup.controls.cpfOuCnpj.value,
      tipo: this.formGroup.controls.tipo.value,
      senha: this.formGroup.controls.senha.value,
      logradouro: this.formGroup.controls.logradouro.value,
      numero: this.formGroup.controls.numero.value,
      complemento: this.formGroup.controls.complemento.value,
      bairro: this.formGroup.controls.bairro.value,
      cep: this.formGroup.controls.cep.value,
      telefone1: this.formGroup.controls.telefone1.value,
      telefone2: this.formGroup.controls.telefone2.value,
      telefone3: this.formGroup.controls.telefone3.value,
      cidadeId: this.formGroup.controls.cidadeId.value,
    };
    console.log("Enviou o cadastro")
    console.log(clienteNewDTO)
  }

  updateCpfOuCnpj() {
    let valorAtual = this.formGroup.controls.cpfOuCnpj.value;
    switch (this.formGroup.controls.tipo.value) {
      case '1':
        this.cpfOuCnpjLabel = "CPF*"
        this.cpfOuCnpjMask = '000.000.000-00'
        break;

      default:
        this.cpfOuCnpjLabel = "CNPJ*"
        this.cpfOuCnpjMask = '00.000.000/0000-00'
        break;
    }
    this.formGroup.controls.cpfOuCnpj.setValue(null);
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
          this.updateCidades();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    let cidade_cep = ""
    if (this.endereco) {
      cidade_cep = this.endereco.localidade;
    }
    this.cidadeService.findAll(estado_id).subscribe(
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
