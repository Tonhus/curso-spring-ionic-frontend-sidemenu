import { FieldMessage } from './../models/field-message';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertController: AlertController) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).catch((error, cought) => {
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }
            console.log("Erro detectado pelo interceptor!")
            console.log(errorObj);
            switch (errorObj.status) {
                case 403:
                    this.handle403();
                    break;
                case 401:
                    this.handle401();
                    break;
                case 422:
                    this.handle422(errorObj);
                    break;
                default:
                    this.defaultHandler(errorObj);
            }
            return Observable.throw(errorObj);
        }) as any;
    }
    
    handle403() {
        this.storage.setLocalUser(null);
    }

    handle401() {
        let alert = this.alertController.create({
            title: 'Error 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [{ text: 'Ok' }]
        });
        alert.present();
    }

    handle422(errorObj) {
        let alert = this.alertController.create({
            title: `Error ${errorObj.status}: ${errorObj.error}`,
            message: this.listErros(errorObj.erros),
            enableBackdropDismiss: false,
            buttons: [{ text: 'Ok' }]
        });
        alert.present();
    }

    listErros(messages: FieldMessage[]): string {
      let s : string = '';
      for (var i=0; i<messages.length;i++){
          s = s + `<p><strong>${messages[i].fieldName}</strong>: ${messages[i].message}</p>`;
      }
      return s;
    }

    defaultHandler(errorObj) {
        let alert = this.alertController.create({
            title: `Error ${errorObj.status}: ${errorObj.error}`,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [{ text: 'Ok' }]
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}