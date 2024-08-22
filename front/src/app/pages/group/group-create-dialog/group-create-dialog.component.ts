import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GroupService } from '../service/group.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-group-create-dialog',
    templateUrl: './group-create-dialog.component.html',
    styleUrls: ['./group-create-dialog.component.scss']
})
export class GroupCreateDialogComponent implements OnInit {
    groupForm: FormGroup;
    niveaux: string[] = ['Poussin', 'Benjamin', 'Minime', 'Cadet', 'Junior', 'Senior'];
    existingNiveaux: string[] = []; // Array to hold existing levels

    constructor(
        public dialogRef: MatDialogRef<GroupCreateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private groupService: GroupService,
        private router: Router
    ) {
        this.groupForm = this.fb.group({
            niveau: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        console.log("club id :"+this.data.club.id)
        this.checkExistingGroups(this.data.club.id);
    }

    checkExistingGroups(clubId: number): void {
        this.groupService.getGroupsByClubId(clubId).subscribe(groups => {
            this.existingNiveaux = groups.map(group => group.niveau); // Assuming 'niveau' is a field in the group
            this.filterNiveaux();
        });
    }

    filterNiveaux(): void {
        this.niveaux = this.niveaux.filter(niveau => !this.existingNiveaux.includes(niveau));
    }

    onNoClick(): void {
        this.dialogRef.close();
        this.router.navigate(['/']);
    }

    createGroup() {
        if (this.groupForm.valid) {
            const ageGroup = this.mapNiveauToAgeGroup(`${this.groupForm.value.niveau}`);
            const groupData = { nom: `${this.data.club.nom} ${ageGroup}` };
            const clubId = this.data.club.id;
            const niveau = this.groupForm.value.niveau;

            this.groupService.createGroup(clubId, niveau, groupData);
            this.dialogRef.close('createGroup');
            this.router.navigate(['/']);
        } else {
            console.error('Form is invalid');
        }
    }

    mapNiveauToAgeGroup(niveau: string): string {
        switch (niveau) {
            case 'Poussin': return 'U10';
            case 'Cadet': return 'U17';
            case 'Benjamin': return 'U12';
            case 'Minim': return 'U14';
            case 'Junior': return 'U20';
            case 'Senior': return '';
            default: return niveau;
        }
    }
}
