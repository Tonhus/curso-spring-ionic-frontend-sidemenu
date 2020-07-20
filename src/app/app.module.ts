
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';


import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthInterceptorProvider } from './../interceptors/auth.interceptor';
import { ErrorInterceptorProvider } from '../interceptors/error.interceptor';

import { AuthService } from './../services/auth.service';
import { CategoriaService } from './../services/domain/categoria.service';
import { ClienteService } from '../services/domain/cliente.service';
import { StorageService } from '../services/storage.service';
import { ViaCepService } from '../services/domain/viaCep.service';
import { ProdutoService } from '../services/domain/produto.service';
import { CartService } from '../services/domain/cart.service';
import { ComponentsModule } from '../components/components.module';
import {FormsModule} from '@angular/forms';
import { ImageBucketService } from '../services/image-bucket.service';


registerLocaleData(localePT);


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {
    provide: LOCALE_ID,
      useValue: "pt"
    },
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    ImageBucketService,
    AuthService,
    StorageService,
    CategoriaService,
    ClienteService,
    ViaCepService,
    ProdutoService,
    CartService
  ]
})
export class AppModule { }
