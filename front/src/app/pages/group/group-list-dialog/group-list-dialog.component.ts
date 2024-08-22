import { Component, Inject, OnInit } from '@angular/core';
import { GroupService } from '../service/group.service';
import { JoueurService } from '../../joueur/service/joueur.service'; // Assuming you have a service for Joueur
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-group-list-dialog',
    templateUrl: './group-list-dialog.component.html',
    styleUrls: ['./group-list-dialog.component.scss']
})
export class GroupListDialogComponent implements OnInit {
    selectedGroups: any[] = [];
    dialogVisible: boolean = false;

    constructor(
        private groupService: GroupService,
        private joueurService: JoueurService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.loadGroups();
    }

    loadGroups() {
        this.groupService.getGroupsByClubId(this.data.club.id).subscribe(groups => {
            this.selectedGroups = groups;
            this.loadPlayersForGroups();
            this.dialogVisible = true;
        });
    }

    loadPlayersForGroups() {
        this.selectedGroups.forEach(group => {
            this.joueurService.getJoueursClub(group.id).subscribe(players => {
                group.players = players; // Assuming each group will have a players array
            });
        });
    }

    resetDialog() {
        this.selectedGroups = [];
    }

    closeDialog() {
        this.selectedGroups = []; // Reset or clear the selected groups if necessary
        this.dialogVisible = false; // Assuming you have a property to control dialog visibility
    }

    viewDetails(group: any) {
        // Implement the logic you want to perform when the button is clicked
        console.log('Viewing details for group:', group);
        // Example: You could route to a detailed view if needed
        // this.router.navigate(['/group-detail', group.id]);
    }
}
