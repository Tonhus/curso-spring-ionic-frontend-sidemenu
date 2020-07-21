import { Observable } from 'rxjs/Rx';

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from '../config/api.config';


@Injectable()
export class ImageBucketService {

    categoriaPrefix: string = "categoria";
    produtoPrefix: string = "prod";
    profilePrefix: string = "cp";

    constructor(public http: HttpClient) {
    }

    getSmallImageUrl(id: string, prefix: string): string {
        return this.getImagePrefixSufixUrl(id, prefix, "-small");
    }

    getImageUrl(id: string, prefix: string): string {
        return this.getImagePrefixSufixUrl(id, prefix, "");
    }

    getImagePrefixSufixUrl(id: string, prefix: string, sufix: string): string {
        return `${API_CONFIG.bucketBaseUrl}/${prefix}${id}${sufix}.jpg`;
    }

    getSmallImageFromBucket(id: string, prefix: string): Observable<any> {
        return this.http.get(this.getSmallImageUrl(id, prefix), { responseType: 'blob' });
    }

    getImageFromBucket(id: string, prefix: string): Observable<any> {
        return this.http.get(this.getImageUrl(id, prefix), { responseType: 'blob' });
    }

    loadImageUrls(items: any[], prefix: string) {
        for (var i = 0; i < items.length; i++) {
            let item = items[i];
            this.loadImageUrl(item, prefix);
        }
    }

    loadImageUrl(item: any, prefix: string) {
        if (!item["imageUrl"]) {
            this.getImageFromBucket(item.id, prefix).subscribe(
                response => {
                    item["imageUrl"] = this.getImageUrl(item.id, prefix);
                },
                error => { }
            );
        }
    }

    loadSmallImageUrls(items: any[], prefix: string) {
        for (var i = 0; i < items.length; i++) {
            let item = items[i];
            this.loadSmallImageUrl(item, prefix);
        }
    }

    loadSmallImageUrl(item: any, prefix: string) {
        if (!item["imageUrl"]) {
            this.getSmallImageFromBucket(item.id, prefix).subscribe(
                response => {
                    item["imageUrl"] = this.getSmallImageUrl(item.id, prefix);
                },
                error => { }
            );
        }
    }
}