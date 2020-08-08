import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { AppointmentService } from 'src/app/services/data/appointment.service';
import { Appointment } from 'src/app/models/api/appointment.model';
import * as moment from 'moment';
import { User } from 'src/app/models/api/user.model';
import { Patient } from 'src/app/models/api/patient.model';
import { VisitMode } from 'src/app/models/api/visitmode.model';
import { VisitType } from 'src/app/models/api/visittype.model';

import { CoreCalendarAddEventDialog } from '../core-calendar/core-calendar-add-event/core-calendar-add-event';

@Component({
  selector: 'app-core-calendar',
  templateUrl: './core-calendar.component.html',
  styleUrls: ['./core-calendar.component.sass'],
  providers: [AppointmentService]
})
export class CoreCalendarComponent {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'listWeek',
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    events: [],
    firstDay: 1,
    locale: 'es',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: false,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    // height: 'auto',
    eventAdd: this.handleEvetAdd.bind(this),
    eventChange: this.handleEvetChange.bind(this),
    eventRemove: this.handleEvetRemove.bind(this),
    
  };
  currentEvents: EventApi[] = [];

  
  constructor(
    private _appointmentService: AppointmentService,
    public _dialog: MatDialog
  ) {
    this.refresh();
   }


  handleEvetAdd(arg) {
    console.log(arg);
  }

  handleEvetChange(arg) {
    const event    = arg.event;
    const oldEvent = arg.oldEvent;

    this._appointmentService.Load(event._def.publicId).subscribe(
      result => {

        console.log(result);
        
        const start = moment(event._instance.range.start);
        const end   = moment(event._instance.range.end);
        
        const duration = end.diff(start, 'minutes');

        result.datetime = start.toDate();
        result.duration = duration;

        this._appointmentService.Save(result).subscribe(
          result => {    

          }, error =>  {
            console.log(error);
        });

      }, error =>  {
        console.log(error);
      });
  }

  handleEvetRemove(arg) {
    console.log('handleEvetRemove');
    console.log(arg);
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {

    const appointment: Appointment = new Appointment();
    appointment.datetime = moment(selectInfo.startStr).toDate();
    appointment.duration = moment(selectInfo.endStr).diff(moment(selectInfo.endStr));
    
    appointment.patient = new Patient();
    appointment.visitMode = new VisitMode();
    appointment.visitType = new VisitType();
    appointment.allowInvoice = 0;
    appointment.forced = 0;
    appointment.hash = '';
    appointment.note = '';
    appointment.owner = new User();
    appointment.price = 0;
    appointment.id = -1;
    appointment.status = 0;

    const dialogRef = this._dialog.open(CoreCalendarAddEventDialog, {
      width: '600px',
      data: {
        'appointment': appointment,
        'selectInfo' : selectInfo
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });

    const dialogSubmitSubscription = 
      dialogRef.componentInstance.submitClicked.subscribe(result => {
        console.log(result);

        this.createEvent(result.appointment, result.selectInfo);

        dialogSubmitSubscription.unsubscribe();
    });

  }

  createEvent(appointment: Appointment, selectInfo: DateSelectArg) {

    this._appointmentService.Create(appointment).subscribe(
      result => {

        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect(); // clear date selection
    
          calendarApi.addEvent({
            id: result.id,
            title:  result.patient != null ? (result.patient.name + ' ' + result.patient.surname + '-\n' + result.note) : result.note,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          });
      }, error =>  {
        console.log(error);
      });
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  createEventId() {
    return 'asda';
  }

  refresh() {
    this._appointmentService.GetFullCalendar().subscribe(
      result => {
        this.calendarOptions.events = result;
      }, error =>  {

      });
  }
}
