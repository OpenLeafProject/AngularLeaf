import { Component } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';


@Component({
  selector: 'app-core-calendar',
  templateUrl: './core-calendar.component.html',
  styleUrls: ['./core-calendar.component.sass']
})
export class CoreCalendarComponent {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    events: [
      { title: 'event 1', date: '2020-08-01' },
      { title: 'event 2', date: '2020-08-02' },
      {
        title  : 'event 3',
        start  : '2020-08-07T12:30:00',
        end    : '2020-08-07T15:00:00'
      }
    ],
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

  handleEvetAdd(arg) {
    console.log(arg);
  }

  handleEvetChange(arg) {
    console.log(arg);
  }

  handleEvetRemove(arg) {
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
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
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

  constructor() { }

}
