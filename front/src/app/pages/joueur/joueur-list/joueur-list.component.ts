import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {JoueurCreateDialogComponent} from "../joueur-create-dialog/joueur-create-dialog.component";
import {Product} from "../../../demo/api/product";
import {SelectItem} from "primeng/api";
import {ProductService} from "../../../demo/service/product.service";
import {DataView} from "primeng/dataview";
import {JoueurService} from "../service/joueur.service";

@Component({
  selector: 'app-joueur-list',
  templateUrl: './joueur-list.component.html',
  styleUrls: ['./joueur-list.component.scss']
})
export class JoueurListComponent implements OnInit {
    joueurs: any[] = [];
    sortOptions: SelectItem[] = [];
    sortOrder: number = 0;
    sortField: string = '';

    constructor(private dialog: MatDialog, private joueurService: JoueurService) {}

    ngOnInit() {
        this.joueurService.getJoueurs().subscribe(data => this.joueurs = data);

        this.sortOptions = [
            { label: 'Value High to Low', value: '!valeur' },
            { label: 'Value Low to High', value: 'valeur' }
        ];
    }

    openJoueurDialog() {
        const dialogRef = this.dialog.open(JoueurCreateDialogComponent, {
            width: '400px',
            height: '850px',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Joueur added:', result);
                // Refresh joueur list or handle result
            }
        });
    }

    onSortChange(event: any) {
        const value = event.value;
        this.sortOrder = value.startsWith('!') ? -1 : 1;
        this.sortField = value.replace('!', '');
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }


    AddPlayerToClub(joueur: any) {
        const contractData = {
            dateDebut: new Date(), // Example dates, replace as needed
            dateFin: new Date(),
            titre: "Contract Title",
            details: "Contract Details",
            club: null // Pass the correct club ID
        };

        const playerData = {
            id: joueur.id,
            fullname: joueur.fullname,
            position: joueur.position,
            jerseyNumber: joueur.jerseyNumber,
            valeur: joueur.valeur,
            bday: joueur.bday,
        };

        this.joueurService.AddPlayerToClub(contractData, playerData).subscribe({
            next: (response) => {
                console.log('Player added to club successfully:', response);
            },
            error: (error) => {
                console.error('Error adding player to club:', error);
            }
        });
    }


}
