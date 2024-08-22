import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClubService {

    private baseUrl = 'http://localhost:8081/clubs';

    constructor(private http: HttpClient) { }

    createClub(club: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/add`, club);
    }
    getClubs(): Observable<any> {
        return this.http.get(`${this.baseUrl}/view`);
    }
    deleteClub(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/delete/${id}`);
    }
    updateClub(club: any) {
        console.log('Updating club with ID:', club.id);
        console.log('Updating club with president:', club.president);
        return this.http.put(`${this.baseUrl}/update/${club.id}`, club);
    }

}
