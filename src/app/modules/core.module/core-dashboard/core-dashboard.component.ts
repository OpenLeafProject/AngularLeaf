import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-core-dashboard',
  templateUrl: './core-dashboard.component.html',
  styleUrls: ['./core-dashboard.component.sass'],
  providers: [MatSnackBar]
})
export class CoreDashboardComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
