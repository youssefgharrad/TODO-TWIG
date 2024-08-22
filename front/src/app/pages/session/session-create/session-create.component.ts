import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-session-create',
  templateUrl: './session-create.component.html',
  styleUrls: ['./session-create.component.scss']
})
export class SessionCreateComponent implements OnInit {

    routeItems!: MenuItem[];

    constructor() { }

  ngOnInit(): void {
      this.routeItems = [
          { label: 'Session', routerLink: 'detail' }, // session fill up the objectif and session date
          { label: 'Strategie', routerLink: 'strategie' }, // choisir les strategies for the exercises offensif / defensif
          { label: 'Groups', routerLink: 'groups' }, // choisir les groups participant et la durée du l'exercise
          { label: 'Attention', routerLink: 'attentions' },
          { label: 'Validation', routerLink: 'confirmation' }, //nom et descripttion vont etre crerer automatiquement a l'aide des information du strategie les group participant .....
      ];
  }


}
