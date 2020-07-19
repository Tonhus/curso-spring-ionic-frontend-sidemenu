import { CategoriaDTO } from './../../models/categoria.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoriaService {
    constructor(public http: HttpClient) {
    }
    findAll(): Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
    getImageUrl(id: string): string {
        return `${API_CONFIG.bucketBaseUrl}/categoria${id}.jpg`;
    }
    getImageFromBucket(id: string): Observable<any> {
        return this.http.get(this.getImageUrl(id), { responseType: 'blob' });
    }
}