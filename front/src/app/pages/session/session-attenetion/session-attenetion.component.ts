import { Component, OnInit } from '@angular/core';
import {SessionService} from "../service/session.service";

@Component({
  selector: 'app-session-attenetion',
  templateUrl: './session-attenetion.component.html',
  styleUrls: ['./session-attenetion.component.scss']
})
export class SessionAttenetionComponent implements OnInit {
    attention: any[] = [];

    selectedAttention: any[] = [];
  constructor(
      private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
      this.sessionService.getFocusAreas().subscribe(focusAreas => {
          this.attention = focusAreas;
      })
      this.loadSelectedFocusAreas() ;
  }

    loadSelectedFocusAreas() {
        const storedAreas = sessionStorage.getItem('selectedFocusAreas');

        this.selectedAttention = storedAreas ? JSON.parse(storedAreas) : [];
    }

    saveSelectedFocusAreas() {
        sessionStorage.setItem('selectedFocusAreas', JSON.stringify(this.selectedAttention));
    }

    toggleFocusAreas(focusAreas: string) {
        const index = this.selectedAttention.indexOf(focusAreas);
        if (index === -1) {
            this.selectedAttention.push(focusAreas);
        } else {
            this.selectedAttention.splice(index, 1);
        }
        this.saveSelectedFocusAreas();
    }

    isSelectedOff(focusAreas: string): boolean {
        return this.selectedAttention.includes(focusAreas);
    }
}
