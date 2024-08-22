import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClublistComponent} from "./clubCreate/clublist.component";
import {ClubListComponent} from "./club-list/club-list.component";
import {ClubEditDialogComponent} from "./club-edit-dialog/club-edit-dialog.component";



const routes: Routes = [
    { path: 'clubform', component: ClublistComponent },
    { path: 'clubview', component: ClubListComponent},
    { path: 'clubEdit', component: ClubEditDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubRoutingModule { }
