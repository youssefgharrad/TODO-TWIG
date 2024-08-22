import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
    private baseUrl = 'http://localhost:8081/players';
    private baseUrlContract = 'http://localhost:8081/contracts';


    constructor(private http: HttpClient) { }

    createPlayer(player: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/add`, player);
    }

    getJoueurs(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/view`);
    }

    AddPlayerToClub(contract: any, player: any): Observable<any> {
        const payload = { contract, player };
        return this.http.post(`${this.baseUrlContract}/add`, payload);
    }

    getJoueursClub(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getByClub/${id}`);
    }
}
