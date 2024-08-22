import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SessionCreateComponent} from "./session-create/session-create.component";
import {SessionDetailComponent} from "./session-detail/session-detail.component";
import {StrategieSelectionComponent} from "./strategie-selection/strategie-selection.component";
import {GroupSelectionComponent} from "./group-selection/group-selection.component";
import {SessionValidationComponent} from "./session-validation/session-validation.component";
import {SessionAttenetionComponent} from "./session-attenetion/session-attenetion.component";

const routes: Routes = [
    { path: 'add', component: SessionCreateComponent  ,
    children:[
    { path: 'detail', component: SessionDetailComponent },
    { path: 'strategie', component: StrategieSelectionComponent },
    { path: 'groups', component: GroupSelectionComponent },
    { path: 'confirmation', component: SessionValidationComponent },
    { path: 'attentions', component: SessionAttenetionComponent },
    ]
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
