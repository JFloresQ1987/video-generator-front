import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { supabase } from 'app/libs/supabase';

@Injectable({
    providedIn: 'root',
})
export class FileUploadService {
    private baseUrl = 'http://localhost:8080';
    constructor(private http: HttpClient) { }

    // upload(file: File): Promise<Observable<HttpEvent<any>>> {
    async upload(file: File): Promise<any> {

        // const avatarFile = event.target.files[0]
        const imageFile = file
        const imageName = `${(new Date()).getTime()}`
        const { data, error } = await supabase
            .storage
            .from('test-bucket')
            .upload(`${imageName}.png`, imageFile, {
                cacheControl: '3600',
                upsert: false
            })

            console.log('entro a service')
            console.log(data)

        if (data) console.log(data)
        if (error) console.log(error)

        return data;



        // const formData: FormData = new FormData();

        // formData.append('file', file);

        // const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
        //   responseType: 'json',
        // });

        // return this.http.request(req);
    }

    getFiles(): Observable<any> {
        return this.http.get(`${this.baseUrl}/files`);
    }
}
