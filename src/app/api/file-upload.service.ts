import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { supabase } from '@shared/libs/supabase';
import { environment } from '@envs/environment';
import Config from '@envs/config.json'

@Injectable({
    providedIn: 'root',
})
export class FileUploadService {
    private baseUrl = 'http://localhost:8080';

    private readonly _http = inject(HttpClient);
    private readonly _endPoint = environment.production ? Config.apiURL : environment.apiURL;
    // private readonly _endPoint = environment.apiURL;

    constructor(private http: HttpClient) { }

    // upload(file: File): Promise<Observable<HttpEvent<any>>> {        
    // async upload(file: File) {        
    async upload(file: File) {

        // // const avatarFile = event.target.files[0]
        // const imageFile = file

        // console.log('entroo image')
        //         console.log(imageFile)

        // const imageName = `${(new Date()).getTime()}`
        // const { data, error } = await supabase
        //     .storage
        //     .from('images')
        //     .upload(`${imageName}.png`, imageFile, {
        //         cacheControl: '3600',
        //         upsert: false
        //     })

        // if (data) console.log(data)
        // if (error) console.log(error)

        // return data?.path;



        const formData: FormData = new FormData();

        formData.append('file', file);

        const url = `${this._endPoint}/orders/images`;
        // return await this._http.post(url, formData);

        // // console.log('entrooo', file)

        const resp = await fetch(url, {
            method: 'POST',
            body: formData
        })

        // // const data = await resp.json();
        return await resp.json();




        // //api/orders/images
        // const req = new HttpRequest('POST', `${this._endPoint}/orders/images`, formData, {
        // // const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
        //   responseType: 'json',
        // });

        // console.log(this.http.request(req))

        // return this.http.request(req);
    }

    getFiles(): Observable<any> {
        return this.http.get(`${this.baseUrl}/files`);
    }
}
