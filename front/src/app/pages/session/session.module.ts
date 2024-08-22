import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import {RouterModule} from "@angular/router";
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { StrategieSelectionComponent } from './strategie-selection/strategie-selection.component';
import { GroupSelectionComponent } from './group-selection/group-selection.component';
import { SessionValidationComponent } from './session-validation/session-validation.component';
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";
import {SliderModule} from "primeng/slider";
import { SessionAttenetionComponent } from './session-attenetion/session-attenetion.component';
import {SidebarModule} from "primeng/sidebar";
import {DragDropModule} from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [
    SessionDetailComponent,
    StrategieSelectionComponent,
    GroupSelectionComponent,
    SessionValidationComponent,
    SessionAttenetionComponent
  ],
    imports: [
        CommonModule,
        SessionRoutingModule,
        RouterModule,
        InputTextModule,
        InputTextareaModule,
        PaginatorModule,
        ButtonModule,
        ReactiveFormsModule,
        CalendarModule,
        RippleModule,
        SliderModule,
        SidebarModule,
        DragDropModule,
    ]
})
export class SessionModule { }
