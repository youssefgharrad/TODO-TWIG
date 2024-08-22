// joueur-create-dialog.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { JoueurService } from '../service/joueur.service';

@Component({
    selector: 'app-joueur-create-dialog',
    templateUrl: './joueur-create-dialog.component.html',
    styleUrls: ['./joueur-create-dialog.component.scss']
})
export class JoueurCreateDialogComponent implements OnInit {
    joueurForm: FormGroup;
    selectedImage: File | null = null;

    constructor(
        private dialogRef: MatDialogRef<JoueurCreateDialogComponent>,
        private fb: FormBuilder,
        private joueurService: JoueurService
    ) {
        this.joueurForm = this.fb.group({
            fullname: ['', Validators.required],
            position: ['', Validators.required],
            jerseyNumber: ['', [Validators.required, Validators.min(0)]],
            valeur: ['', [Validators.required, Validators.min(0)]],
            bday: ['', Validators.required],
            pictureUrl: [null, Validators.required]
        });
    }

    ngOnInit(): void {}

    onImageSelected(event: any): void {
        this.selectedImage = event.target.files[0];
    }

    save() {
        if (this.joueurForm.valid && this.selectedImage) {
            const formData = new FormData();
            formData.append('fullname', this.joueurForm.get('fullname')?.value);
            formData.append('position', this.joueurForm.get('position')?.value);
            formData.append('jerseyNumber', this.joueurForm.get('jerseyNumber')?.value);
            formData.append('valeur', this.joueurForm.get('valeur')?.value);
            formData.append('bday', this.joueurForm.get('bday')?.value);
            formData.append('image', this.selectedImage);

            this.joueurService.createPlayer(formData).subscribe(
                response => {
                    console.log('Player created successfully:', response);
                    this.dialogRef.close(response);
                },
                error => {
                    console.error('Error creating player:', error);
                }
            );
        }
    }

    close() {
        this.dialogRef.close();
    }
}
