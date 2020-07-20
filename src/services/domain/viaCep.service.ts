import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { ViaCepDTO } from '../../models/viacep.dto';

@Injectable()
export class ViaCepService {
    
    constructor(public http: HttpClient) {
    }

    getEndereco(cep: String): Observable<ViaCepDTO> {
        return this.http.get<ViaCepDTO>(`http://viacep.com.br/ws/${cep}/json/`);
    }

}