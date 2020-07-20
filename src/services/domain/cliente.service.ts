import { ClienteNewDTO } from './../../models/cliente.new.dto';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../storage.service';
import { ClienteDTO } from '../../models/cliente.dto';

@Injectable()
export class ClienteService {
    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findByEmail(email: string) {
        return this.http.get(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageUrl(id: string): string {
        return `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    }

    getImageFromBuket(id: string): Observable<any> {
        return this.http.get(this.getImageUrl(id), { responseType: 'blob' });
    }

    insert(obj: ClienteNewDTO) {

        obj.cpfOuCnpj = obj.cpfOuCnpj ? obj.cpfOuCnpj.replace(/[^\d]+/g, '') : null;
        obj.cep = obj.cep ? obj.cep.replace(/[^\d]+/g, '') : null;
        obj.telefone1 = obj.telefone1 ? obj.telefone1.replace(/[^\d]+/g, '') : null;
        obj.telefone2 = obj.telefone3 ? obj.telefone2.replace(/[^\d]+/g, '') : null;
        obj.telefone3 = obj.telefone2 ? obj.telefone3.replace(/[^\d]+/g, '') : null;
        console.log(obj);
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            });
    }


}