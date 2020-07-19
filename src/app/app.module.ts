


import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

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

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
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
