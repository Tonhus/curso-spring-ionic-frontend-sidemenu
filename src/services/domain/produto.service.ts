import { Observable } from 'rxjs/Rx';
import { ProdutoDTO } from './../../models/produto.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ProdutoService {


    constructor(public http: HttpClient) {
    }
    findByCategoria(categoria_id: string): Observable<ProdutoDTO[]> {
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }
    findById(produto_id: string): Observable<ProdutoDTO> {
        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    getSmallImageUrl(id: string): string {
        return `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    }
    getImageUrl(id: string): string {
        return `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
    }
    getSmallImageFromBucket(id: string): Observable<any> {
        return this.http.get(this.getSmallImageUrl(id), { responseType: 'blob' });
    }
    getImageFromBucket(id: string): Observable<any> {
        return this.http.get(this.getImageUrl(id), { responseType: 'blob' });
    }
}