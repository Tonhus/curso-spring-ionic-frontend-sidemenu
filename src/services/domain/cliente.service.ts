import { ClienteNewDTO } from './../../models/cliente.new.dto';
import { API_CONFIG } from '../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";



@Injectable()
export class ClienteService {
    constructor(public http: HttpClient) {
    }

    findById(id: string) {
        return this.http.get(
            `${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email: string) {
        return this.http.get(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
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