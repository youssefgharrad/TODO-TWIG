import { Component, OnInit } from '@angular/core';
import {SessionService} from "../service/session.service";

@Component({
  selector: 'app-strategie-selection',
  templateUrl: './strategie-selection.component.html',
  styleUrls: ['./strategie-selection.component.scss']
})
export class StrategieSelectionComponent implements OnInit {

    defensiveStrategies: any[] = [];
    offensiveStrategies: any[] = [];

    selectedStrategiesOff: any[] = [];
    selectedStrategiesDef: any[] = [];

    constructor(
        private sessionService: SessionService,
    ) {}

    ngOnInit(): void {
        this.sessionService.getStrategies().subscribe(strategies => {
            this.defensiveStrategies = strategies.DEFENSIVE.map((strategie: string) => ({ description: strategie }));
            this.offensiveStrategies = strategies.OFFENSIVE.map((strategie: string) => ({ description: strategie }));
            console.log(this.defensiveStrategies); // This will now show the populated arrays
            console.log(this.offensiveStrategies); // This will now show the populated arrays

            // Load previously selected strategies from session storage
            this.loadSelectedStrategies();
        });
    }

    loadSelectedStrategies() {
        const storedDef = sessionStorage.getItem('selectedDefensiveStrategies');
        const storedOff = sessionStorage.getItem('selectedOffensiveStrategies');

        this.selectedStrategiesDef = storedDef ? JSON.parse(storedDef) : [];
        this.selectedStrategiesOff = storedOff ? JSON.parse(storedOff) : [];
    }

    saveSelectedStrategies() {
        sessionStorage.setItem('selectedDefensiveStrategies', JSON.stringify(this.selectedStrategiesDef));
        sessionStorage.setItem('selectedOffensiveStrategies', JSON.stringify(this.selectedStrategiesOff));
    }

    toggleStrategyOff(strategie: string) {
        const index = this.selectedStrategiesOff.indexOf(strategie);
        if (index === -1) {
            this.selectedStrategiesOff.push(strategie);
        } else {
            this.selectedStrategiesOff.splice(index, 1);
        }
        this.saveSelectedStrategies();
        console.log(this.selectedStrategiesOff);
    }

    toggleStrategyDef(strategie: string) {
        const index = this.selectedStrategiesDef.indexOf(strategie);
        if (index === -1) {
            this.selectedStrategiesDef.push(strategie);
        } else {
            this.selectedStrategiesDef.splice(index, 1);
        }
        this.saveSelectedStrategies();
        console.log(this.selectedStrategiesDef);
    }

    isSelectedOff(strategie: string): boolean {
        return this.selectedStrategiesOff.includes(strategie);
    }

    isSelectedDef(strategie: string): boolean {
        return this.selectedStrategiesDef.includes(strategie);
    }
}

