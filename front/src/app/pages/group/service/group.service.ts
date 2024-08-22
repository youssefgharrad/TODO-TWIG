import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    private baseUrl = 'http://localhost:8081/groups';

    constructor(private http: HttpClient, private router: Router) { }

    // createGroup(group: any): Observable<any> {
    //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     const clubId = group.club.id; // Extract the club ID
    //     const niveau = group.niveau;
    //     return this.http.post(`${this.baseUrl}/add/${clubId}/${niveau}`, group, { headers });
    // }

    createGroup(clubId: number, niveau: string, group: any): void {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(group);

        this.http.post(`${this.baseUrl}/add/${clubId}/${niveau}`, body, { headers }).subscribe(
            response => {
                console.log('Group created successfully:', response);
                this.router.navigate(['/']); // Replace '/' with your desired route
            },
            error => {
                console.error('Error creating group:', error);
            }
        );
    }

    getGroupsByClubId(clubId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/clubs/${clubId}/groups`);
    }

}
