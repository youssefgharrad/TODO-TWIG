import { Component, OnInit } from '@angular/core';
import {SessionService} from "../service/session.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-session-validation',
  templateUrl: './session-validation.component.html',
  styleUrls: ['./session-validation.component.scss']
})
export class SessionValidationComponent implements OnInit {
    selectedGroups = JSON.parse(sessionStorage.getItem('selectedGroups') || '[]');
     storedOffensiveStrategies = JSON.parse(sessionStorage.getItem('selectedOffensiveStrategies') || '[]');
     storedDefensiveStrategies = JSON.parse(sessionStorage.getItem('selectedDefensiveStrategies') || '[]');
     duration = JSON.parse(sessionStorage.getItem('duration') || '[]');
    visibleSidebar3: boolean = false;

    sessionTypes: string[] = ["Situation", "Jeu", "Échauffement", "Exercice technique", "Jeu inclassable"];
    selectedSessionTypes: string[] = [];

    maxDuration: number = JSON.parse(sessionStorage.getItem('duration') || '[]');  // Set a default maximum duration
    durations: number[] = [];    // Array to hold durations for each session type
    leftovers:number = 0;

    exerciseForm: FormGroup;
    niveauMapping: { [key: string]: string } = {
        "Poussin": "U10",
        "Benjamin": "U12",
        "Minim": "U14",
        "Cadet": "U17",
        "Junior": "U20",
        "Senior": "Senior"
    };

  constructor(
      private fb: FormBuilder,
      private sessionService: SessionService,
  ) {
      this.exerciseForm = this.fb.group({

      });
  }

  ngOnInit(): void {
      this.viewGroup() ;
      this.initializeDurations();
  }

  viewGroup(){
      this.selectedGroups = this.selectedGroups.map((group:any) => ({
          ...group,
          uLevel: this.niveauMapping[group.niveau]
      }));
      const storedTypes = JSON.parse(sessionStorage.getItem('selectedSessionTypes') || '[]');
      this.selectedSessionTypes = storedTypes.length ? storedTypes : this.selectedSessionTypes;

      console.log(this.storedDefensiveStrategies)
  }

    selectSessionType(type: string) {
        this.selectedSessionTypes.push(type);
        console.log(this.selectedSessionTypes);
    }

    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.selectedSessionTypes, event.previousIndex, event.currentIndex);
        this.saveSessionTypes();
    }

    removeType(index: number): void {
        this.selectedSessionTypes.splice(index, 1);
        this.saveSessionTypes();
    }

    saveSessionTypes(): void {
        sessionStorage.setItem('selectedSessionTypes', JSON.stringify(this.selectedSessionTypes));
    }

    initializeDurations() {
        const splitDuration = Math.floor(this.duration / this.selectedSessionTypes.length); // Use Math.floor or Math.round
        this.durations = Array(this.selectedSessionTypes.length).fill(splitDuration);
    }

    updateDurations(index: number, newValue: number) {
        const totalDuration = this.duration; // The maximum allowed duration
        const currentTotal = this.durations.reduce((acc, val) => acc + val, 0);

        // Update the specific duration
        const adjustedValue = Math.max(0, newValue); // Ensure the value is not negative
        this.durations[index] = adjustedValue;

        // Calculate the new total after the update
        const newTotal = this.durations.reduce((acc, val) => acc + val, 0);

        // If the new total exceeds the max duration, adjust the others
        if (newTotal > totalDuration) {
            const excess = newTotal - totalDuration;

            // Distribute the excess to other durations
            for (let i = 0; i < this.durations.length; i++) {
                if (i !== index) {
                    const reduction = Math.ceil(excess / (this.durations.length - 1));
                    this.durations[i] = Math.max(0, this.durations[i] - reduction);
                }
            }
        }
    }
    calculateLeftovers() {
        const totalUsed = this.durations.reduce((acc, val) => acc + val, 0);
        this.leftovers = Math.max(0, this.duration - totalUsed); // Calculate leftovers
    }

    save() {
        const params = new HttpParams()
            .set('nom', this.exerciseForm.get('nom')?.value || '')
            .set('description', this.exerciseForm.get('description')?.value || '')
            .set('strategie', JSON.stringify([...this.storedDefensiveStrategies, ...this.storedOffensiveStrategies]))
            .set('durationMax', this.duration.toString())
            .set('type', JSON.stringify(this.selectedSessionTypes))
            .set('duration', JSON.stringify(this.durations))
            .set('focusArea', JSON.stringify(JSON.parse(sessionStorage.getItem('selectedFocusAreas') || '[]')))
            .set('sessionId', JSON.stringify(JSON.parse(sessionStorage.getItem('sessionId') || '[]')));

        console.log(params)
        this.sessionService.createExercise(params.toString()).subscribe(
            response => {
                console.log('Exercise created successfully:', response);
            },
            error => {
                console.error('Error creating exercise:', error);
            }
        );
    }





}
