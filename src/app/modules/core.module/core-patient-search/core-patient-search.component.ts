import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PatientService } from 'src/app/services/data/patient.service';
import { Patient } from 'src/app/models/api/patient.model';

@Component({
  selector: 'app-core-patient-search',
  templateUrl: './core-patient-search.component.html',
  styleUrls: ['./core-patient-search.component.sass'],
  providers: [PatientService]
})
export class CorePatientSearchComponent implements OnInit {

  displayedColumns = ['nhc', 'name', 'surname', 'lastname', 'age', 'note','phone', 'buttons'];
  displayedColumnsSmall = ['name', 'surname', 'lastname', 'buttons'];
  
  dataSource: Patient[];

  pageLength: number;
  splicedData: Patient[];
  pageSize: number = 5;

  search: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _patientService: PatientService
  ) {}

  ngOnInit(): void {
  }

  refresh() {
    this._patientService.Search(this.search).subscribe(
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
