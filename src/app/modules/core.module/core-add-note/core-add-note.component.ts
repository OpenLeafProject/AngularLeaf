import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../../models/api/note.model';
import { Patient } from 'src/app/models/api/patient.model';
import { PatientService } from 'src/app/services/data/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core-add-note',
  templateUrl: './core-add-note.component.html',
  styleUrls: ['./core-add-note.component.sass']
})
export class CoreAddNoteComponent implements OnInit {

  @Input() showNewNote: boolean;
  @Input() patientid: number;
  
  @Output() close = new EventEmitter<string>();
  newNote: string;

  constructor(
    private _patientService: PatientService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.close.emit('cancel');
  }

  save() {
    const content = this.newNote;
    const patientid = this.patientid;

    this._patientService.CreateNote(content, patientid).subscribe(
      result => {
        console.log(result);
        this.newNote = '';
        this.close.emit('saved');
      }, error => {
        console.log(error);
      });

    
  }

}
