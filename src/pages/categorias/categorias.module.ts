import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriasPage } from './categorias';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CategoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriasPage),
    ComponentsModule,
  ],
})
export class CategoriasPageModule { }
