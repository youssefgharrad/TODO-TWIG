import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JoueurListComponent} from "./joueur-list/joueur-list.component";

const routes: Routes = [
    { path: 'list', component: JoueurListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoueurRoutingModule { }
