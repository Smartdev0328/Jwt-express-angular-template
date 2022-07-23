import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
    HttpClient,
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root',
})
export class ContactService {
    endpoint: string = 'http://localhost:8080/api';
    //headers = new HttpHeaders().set('Content-Type', 'application/json');
    //currentUser = {};
    constructor(private http: HttpClient, public router: Router) { }
    // contact-request
    contact(data: any): Observable<any> {
        let api = `${this.endpoint}/contact`;
        return this.http.post(api, data);
    }
    contactList(data: any): Observable<any> {
        let api = `${this.endpoint}/contact-list`;
        return this.http.get(api);
    }
}