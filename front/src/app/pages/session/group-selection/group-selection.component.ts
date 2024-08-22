import {Component, Inject, OnInit} from '@angular/core';
import {GroupService} from "../../group/service/group.service";
import {JoueurService} from "../../joueur/service/joueur.service";
import {SessionService} from "../service/session.service";

@Component({
  selector: 'app-group-selection',
  templateUrl: './group-selection.component.html',
  styleUrls: ['./group-selection.component.scss']
})
export class GroupSelectionComponent implements OnInit {

    valSlider = JSON.parse(sessionStorage.getItem('duration') || '60');
    selectedGroups: any[] = [];
    allGroups: any[] = [];

    // Mapping from 'niveau' to 'U' levels
    niveauMapping: { [key: string]: string } = {
        "Poussin": "U10",
        "Benjamin": "U12",
        "Minim": "U14",
        "Cadet": "U17",
        "Junior": "U20",
        "Senior": "Senior"
    };

    constructor(
        private sessionService: SessionService,
    ) {}

    ngOnInit(): void {
        this.loadGroups();
    }

    loadGroups() {
        this.sessionService.getGroups().subscribe(groups => {
            this.allGroups = groups.map((group:any) => ({
                ...group,
                uLevel: this.niveauMapping[group.niveau]
            }));

            // Load selected groups from session storage
            const storedGroups = JSON.parse(sessionStorage.getItem('selectedGroups') || '[]');
            this.selectedGroups = storedGroups;
            console.log(this.selectedGroups);
        });
    }

    toggleGroupSelection(group: any) {
        const index = this.selectedGroups.findIndex(g => g.id === group.id);
        if(index === -1) {
            this.selectedGroups.push(group);
        } else {
            this.selectedGroups.splice(index, 1);
        }
        this.saveSelectedGroups();
        console.log(this.selectedGroups);
    }

    isGroupSelected(group: any): boolean {
        return this.selectedGroups.some(g => g.id === group.id);
    }

    formatTime(value: number): string {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return `${hours}h${minutes} minutes`;
    }

    saveSelectedGroups() {
        sessionStorage.setItem('selectedGroups', JSON.stringify(this.selectedGroups));
    }

    SlideChnage(i : any){
        sessionStorage.setItem('duration', JSON.stringify(i));
    }
}


