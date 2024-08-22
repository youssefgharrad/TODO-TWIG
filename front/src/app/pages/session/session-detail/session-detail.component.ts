import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionService} from "../service/session.service";

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {

    detailForm: FormGroup;
  constructor(
      private fb: FormBuilder,
      private sessionService: SessionService,
  ) {
      this.detailForm = this.fb.group({
          objectif: ['', Validators.required],
          date: ['', Validators.required],
      });
  }


  ngOnInit(): void {
  }

    createSession(): void {
        if (this.detailForm.valid) {
            const formData: FormData = new FormData();
            formData.append('objectif', this.detailForm.get('objectif')?.value);
            formData.append('date', this.detailForm.get('date')?.value);

            this.sessionService.createSession(formData).subscribe(
                response => {
                    sessionStorage.setItem('sessionId',response.toString());
                },
                error => {
                    console.error('Error creating Session:', error);
                }
            );
        }
    }

}
