import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupcreateComponent } from './groupcreate/groupcreate.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import { GroupCreateDialogComponent } from './group-create-dialog/group-create-dialog.component';
import { GroupListDialogComponent } from './group-list-dialog/group-list-dialog.component';
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    GroupcreateComponent,
    GroupCreateDialogComponent,
    GroupListDialogComponent
  ],
    imports: [
        CommonModule,
        GroupRoutingModule,
        FormsModule,
        DropdownModule,
        ReactiveFormsModule,
        DialogModule,
        TableModule,
        MatCardModule
    ]
})
export class GroupModule { }
