import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountryService } from '../../../demo/service/country.service';

@Component({
    selector: 'app-club-edit-dialog',
    templateUrl: './club-edit-dialog.component.html',
    styleUrls: ['./club-edit-dialog.component.scss']
})
export class ClubEditDialogComponent implements OnInit {
    editForm: FormGroup;
    countries: any[] = [];
    filteredCountries: any[] = [];

    constructor(
        private fb: FormBuilder,
        private countryService: CountryService,
        public dialogRef: MatDialogRef<ClubEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.editForm = this.fb.group({
            id: [data.club.id],
            nom: [data.club.nom, Validators.required],
            president: [data.club.president, Validators.required],
            foundationYear: [new Date(data.club.foundationYear), Validators.required],
            location: [data.club.location, Validators.required]
        });
    }

    ngOnInit(): void {
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });
    }

    filterCountry(event: any) {
        const query = event.query.toLowerCase();
        this.filteredCountries = this.countries.filter(country =>
            country.name.toLowerCase().startsWith(query)
        );
    }

    onCountrySelect(event: any): void {
        this.editForm.patchValue({ location: event.name });
    }

    onSave(): void {
        if (this.editForm.valid) {
            // Convert the date to the required format if necessary
            const formData = {
                ...this.editForm.value,
                foundationYear: this.editForm.value.foundationYear.toISOString()
            };
            this.dialogRef.close(formData);
        } else {
            console.log("Form is invalid");
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
