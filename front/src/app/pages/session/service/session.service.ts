import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
    private baseUrl = 'http://localhost:8081/sessions';
    private baseUrlEx = 'http://localhost:8081/exercices';

    constructor(private http: HttpClient) { }

    createSession(session: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/add`, session);
    }
    getStrategies(): Observable<any> {
        return this.http.get(`${this.baseUrlEx}/strategies`);
    }
    getGroups(): Observable<any> {
        return this.http.get(`${this.baseUrlEx}/groupsInv`);
    }
    getFocusAreas(): Observable<any> {
        return this.http.get(`${this.baseUrlEx}/focusAreas`);
    }
    createExercise(exercise:any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(`${this.baseUrlEx}/add`,exercise, { headers });
    }
}
