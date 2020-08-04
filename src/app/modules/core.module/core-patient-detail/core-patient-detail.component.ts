import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/api/patient.model';
import { Note } from 'src/app/models/api/note.model';
import { PatientService } from 'src/app/services/data/patient.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewActions } from '../core-patient-detail/core-patient-detail-navactions';

@Component({
  selector: 'app-core-patient-detail',
  templateUrl: './core-patient-detail.component.html',
  styleUrls: ['./core-patient-detail.component.sass'],
  providers: [PatientService, MatBottomSheet]
})
export class CorePatientDetailComponent implements OnInit {

  patient: Patient;
  notes: Note[];
  panelOpenState: boolean;
  bottomSheetRef: MatBottomSheetRef;
  showNewNote: boolean;

  constructor(
    private _patientService: PatientService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _bottomSheet: MatBottomSheet
  ) { }

  openBottomSheet(): void {
    this.bottomSheetRef = this._bottomSheet.open(BottomSheetOverviewActions);
    this.bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      switch(dataFromChild) {
        case 'newNote':
          this.showNewNote = true;
          break;
        case 'newDate':
          // route to fullcalendar
          break;
      }
    });
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.patient = new Patient();
        this.patient.nhc = params.nhc;
        this.load();
      }
    );
  }

  onCloseNote(reason) {
    switch (reason) {
      case 'cancel':
        this.showNewNote = false;
        break;
      case 'saved':
        this.showNewNote = false;
        this.loadNotes();
        break;
    }
  }

  load() {
    this._patientService.Load(this.patient.nhc).subscribe(
      result => {
        console.log(result);
        this.patient = result;
        this.loadNotes();
      }, error => {
        console.log(error);
      });
  }

  loadNotes() {
    this._patientService.GetNotes(this.patient.nhc).subscribe(
      result => {
        console.log(result);
        this.notes = result;
      }, error => {
        console.log(error);
      });
  }

}




