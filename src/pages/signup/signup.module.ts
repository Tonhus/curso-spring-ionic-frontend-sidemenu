import { CidadeService } from './../../services/domain/cidade.service';
import { EstadoService } from './../../services/domain/estado.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { IonMaskModule } from '@pluritech/ion-mask';

@NgModule({
  declarations: [
    SignupPage
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    IonMaskModule.forRoot(),
    
  ],
  providers:[
    EstadoService,
    CidadeService
  ]
})
export class SignupPageModule {}
