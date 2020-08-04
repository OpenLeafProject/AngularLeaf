import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../../../services/data/patient.service';
import { Patient } from '../../../models/api/patient.model';

@Component({
  selector: 'app-core-dashboard',
  templateUrl: './core-dashboard.component.html',
  styleUrls: ['./core-dashboard.component.sass'],
  providers: [MatSnackBar, PatientService]
})
export class CoreDashboardComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private _patientService: PatientService
  ) {}

  patient: Patient;

  ngOnInit(): void {

  }

  refresh() {
    this._patientService.Load(1).subscribe(
      result => {
        this.patient = result;
      }, error =>  {
        // do nothing
        
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  stringify(value: any): string {
    return JSON.stringify(value, undefined, 4);
  }
}
