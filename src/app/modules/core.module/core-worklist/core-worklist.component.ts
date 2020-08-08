import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppointmentService } from 'src/app/services/data/appointment.service';
import { Patient } from 'src/app/models/api/patient.model';
import { Appointment } from 'src/app/models/api/appointment.model';

@Component({
  selector: 'app-core-worklist',
  templateUrl: './core-worklist.component.html',
  styleUrls: ['./core-worklist.component.sass'],
  providers: [AppointmentService]
})
export class CoreWorklistComponent implements OnInit {

  displayedColumns = ['nhc', 'time', 'name', 'surname', 'lastname', 'age', 'note','phone', 'buttons'];
  displayedColumnsSmall = ['time', 'name', 'buttons'];
  
  dataSource: Appointment[];

  pageLength: number;
  splicedData: Appointment[];
  pageSize: number = 5;

  search: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this._appointmentService.GetTodaysList().subscribe(
      result => {
        this.dataSource = result;
        this.pageLength = result.length;
        this.splicedData = result.slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
      }, error =>  {
        
      });
  }

  pageChangeEvent(event) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.splicedData = this.dataSource.slice(offset).slice(0, event.pageSize);
  }

  select(nhc: number) {
    alert(nhc);
  }

}