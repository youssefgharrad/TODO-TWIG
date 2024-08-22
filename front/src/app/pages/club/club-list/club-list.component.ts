import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClubService } from '../service/club.service'; // Adjust the path accordingly
import { ConfirmationService } from 'primeng/api';
import {MatDialog} from "@angular/material/dialog";
import {ClubEditDialogComponent} from "../club-edit-dialog/club-edit-dialog.component";
import {GroupCreateDialogComponent} from "../../group/group-create-dialog/group-create-dialog.component";
import {GroupListDialogComponent} from "../../group/group-list-dialog/group-list-dialog.component";
import {ClublistComponent} from "../clubCreate/clublist.component";

@Component({
    selector: 'app-club-list',
    templateUrl: './club-list.component.html',
    styleUrls: ['./club-list.component.scss'],
    providers: [ConfirmationService]
})
export class ClubListComponent implements OnInit {
    clubs: any[] = [];
    loading: boolean = true;

    @ViewChild('globalFilter') globalFilter!: ElementRef;

    constructor(private clubService: ClubService,
                private confirmationService: ConfirmationService,
                private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.loadClubs();
    }

    loadClubs() {
        this.clubService.getClubs().subscribe(data => {
            this.clubs = data;
            this.loading = false;
        });
    }

    deleteClub(id: number) {
        // this.confirmationService.confirm({
        //     message: 'Are you sure you want to delete this club?',
        //     accept: () => {
                this.clubService.deleteClub(id).subscribe(() => {
                    this.loadClubs(); // Reload clubs after deletion
            //     });
            // }
        });
    }

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: any) {
        table.clear();
        this.globalFilter.nativeElement.value = '';
    }

    openEditDialog(club: any) {
        const dialogRef = this.dialog.open(ClubEditDialogComponent, {
            width: '600px',
            height: '640px',
            data: { club },
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.updateClub(result);
            }
        });
    }

    updateClub(updatedClub: any) {
        this.clubService.updateClub(updatedClub).subscribe(
            response => {
                console.log('Club updated successfully:', response);
            },
            error => {
                console.error('Error updating club:', error);
            }
        );
    }

    openGroupCreateDialog(club: any) {
        const dialogRef = this.dialog.open(GroupCreateDialogComponent, {
            width: '400px',
            data: { club },
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'createGroup') {
                console.log('User chose to create a group');
                // Handle additional actions if needed
            } else {
                console.log('User chose to skip group creation');
            }
        });
    }

    openGroupList(club: any) {
        const dialogRef = this.dialog.open(GroupListDialogComponent, {
            width: '500px',
            height: '600px',
            data: { club },
           // disableClose: true,
        });

        dialogRef.afterClosed().subscribe(result => {
            // ??
        });
    }

    openClubCreate() {
        const dialogRef = this.dialog.open(ClublistComponent, {
            width: '800px',
            height: '640px',
            disableClose: false,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.updateClub(result);
            }
        });
    }
}
