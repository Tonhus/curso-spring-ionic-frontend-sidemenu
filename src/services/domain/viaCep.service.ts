import { CidadeDTO } from './../../models/cidade.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { ViaCepDTO } from '../../models/viacep.dto';
import { EstadoDTO } from "../../models/estado.dto";

@Injectable()
export class ViaCepService {
    
    constructor(public http: HttpClient) {
    }

    getEndereco(cep: String): Observable<ViaCepDTO> {
        return this.http.get<ViaCepDTO>(`http://viacep.com.br/ws/${cep}/json/`);
    }

    getEstados(): Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`);
    }

    getCidades(estadoId: number): Observable<CidadeDTO[]> {
        return this.http.get<EstadoDTO[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
    }
}