import { Component, Inject, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Patient } from 'src/app/models/api/patient.model';
import { User } from 'src/app/models/api/user.model';
import { PatientService } from 'src/app/services/data/patient.service';
import { VisitModeService } from 'src/app/services/data/visitMode.service';
import { VisitTypeService } from 'src/app/services/data/visitType.service';

import { UserService } from 'src/app/services/data/user.service';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { VisitType } from 'src/app/models/api/visittype.model';
import { VisitMode } from 'src/app/models/api/visitmode.model';

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'core-calendar-add-event.html',
    providers: [FormBuilder, PatientService, UserService, 
                VisitModeService, VisitTypeService,
                {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}]
  })
export class CoreCalendarAddEventDialog implements OnInit {

    @Output() submitClicked = new EventEmitter<any>();

    patientList;
    userList: User[];
    visitModeList: VisitMode[];
    visitTypeList: VisitType[];

    session_user: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<CoreCalendarAddEventDialog>,
        private formBuilder: FormBuilder,
        private _patientService: PatientService,
        private _visitModeService: VisitModeService,
        private _visitTypeService: VisitTypeService,
        
        private _userService: UserService,
        private _adapter: DateAdapter<any>
    ){}

    ngOnInit(): void {

        console.log(this.data);

        this._adapter.setLocale('es');

        const time_start: moment.Moment = moment(this.data.selectInfo.start);
        const time_end: moment.Moment =  moment(this.data.selectInfo.end);
        const all_day: Boolean = this.data.selectInfo.allDay;

        this.createForm.controls.startTime.setValue(time_start.format('HH:mm'));
        this.createForm.controls.endTime.setValue(time_end.format('HH:mm'));
        
        this.createForm.controls.startDate.setValue(time_start.toDate());
        this.createForm.controls.endDate.setValue(time_end.toDate());

        this.calculateDuration();
        this.loadUsers();
        this.loadVisitModes();
        this.loadVisitTypes();
        
        this.session_user = sessionStorage.getItem('user');

    }

    createForm = new FormGroup({
        assignedTo:     new FormControl({value: '', disabled: false}, [Validators.required]),
        startTime:      new FormControl({value: '', disabled: false}, [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')]),
        endTime:        new FormControl({value: '', disabled: false}, [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')]),
        startDate:      new FormControl({value: '', disabled: false}, [Validators.required]),
        endDate:        new FormControl({value: '', disabled: false}, [Validators.required]),
        visitType:      new FormControl({value: '', disabled: false}, [Validators.required]),
        visitMode:      new FormControl({value: '', disabled: false}, [Validators.required]),
        duration:       new FormControl({value: '', disabled: true }, [Validators.required, Validators.maxLength(1), Validators.minLength(3), Validators.pattern('[0-1]{0-3}')]),
        price:          new FormControl({value: '', disabled: false}, [Validators.maxLength(1), Validators.minLength(6), Validators.pattern('[0-1\.]*')]),
        patientSearch:  new FormControl({value: '', disabled: false}, []),
        patient:        new FormControl({value: '', disabled: false}, []),
        note:           new FormControl({value: '', disabled: false}, [Validators.maxLength(255), Validators.pattern('[a-zA-Zà-úÀ-Ù0-9+()/ ]*')]),
   
    });

    public hasError = (controlName: string, errorName: string) =>{
        return this.createForm.controls[controlName].hasError(errorName);
    }

    saveMessage() {

        
        this.data.appointment.allowInvoice = 1;
        this.data.appointment.datetime = this.data.selectInfo.start;
        this.data.appointment.duration = this.createForm.controls.duration.value;
        this.data.appointment.forced = 0;
        this.data.appointment.hash = '';
        //this.data.appointment.id = '';
        this.data.appointment.note = this.createForm.controls.note.value;
        this.data.appointment.price = this.createForm.controls.price.value;
        this.data.appointment.status = 0;

        const vm: VisitMode = new VisitMode();
        const vt: VisitType = new VisitType();
        const us: User      = new User();
        const pt: Patient   = new Patient();

        vm.id  = this.createForm.controls.visitMode.value;
        vt.id  = this.createForm.controls.visitType.value;
        us.id  = this.createForm.controls.assignedTo.value;
        pt.nhc = this.createForm.controls.patient.value;

        this.data.appointment.visitMode = vm;
        this.data.appointment.visitType = vt;
        this.data.appointment.owner = us;
        this.data.appointment.patient = pt;


        this.submitClicked.emit(this.data);
        this.dialogRef.close();
    }

    calculateDuration($event = null) {

        const selected_day_start: moment.Moment = moment(this.createForm.controls.startDate.value, 'DD-MM-YYYY');
        const selected_day_end: moment.Moment =  moment(this.createForm.controls.endDate.value, 'DD-MM-YYYY');

        const time_start: moment.Moment = moment(
            selected_day_start.format('DD/MM/YYYY ') + this.createForm.controls.startTime.value,
            'DD-MM-YYYY HH:mm'
        );

        const time_end: moment.Moment = moment(
            selected_day_end.format('DD/MM/YYYY ') + this.createForm.controls.endTime.value,
            'DD-MM-YYYY HH:mm'
        );

        this.data.selectInfo.start = time_start.toDate();
        this.data.selectInfo.end = time_end.toDate();
        
        this.createForm.controls.duration.setValue(time_end.diff(time_start, 'minutes'));
        
    }

    searchPatients() {
        this._patientService.Search(this.createForm.controls.patientSearch.value).subscribe(
            result => {
                this.patientList = result;
            }, error =>  {
              console.log(error);
        });
    }

    loadUsers() {
        this._userService.GetAllUsers().subscribe(
            result => {
                this.userList = result;
                for (let user of this.userList) {
                    if(user.username == this.session_user) {
                        this.createForm.controls.assignedTo.setValue(user.id);
                    }
                }
            }, error =>  {
              console.log(error);
        });
    }

    loadVisitModes() {
        this._visitModeService.GetAllModes().subscribe(
            result => {
                this.visitModeList = result;
            }, error =>  {
              console.log(error);
        });
    }

    loadVisitTypes() {
        this._visitTypeService.GetAllTypes().subscribe(
            result => {
                this.visitTypeList = result;
            }, error =>  {
              console.log(error);
        });
    }

}