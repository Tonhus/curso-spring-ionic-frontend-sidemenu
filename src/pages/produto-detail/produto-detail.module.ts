import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoDetailPage } from './produto-detail';
import { IconeCartComponent } from '../../components/icone-cart/icone-cart';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProdutoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoDetailPage),
    ComponentsModule,
  ],
})
export class ProdutoDetailPageModule {}
