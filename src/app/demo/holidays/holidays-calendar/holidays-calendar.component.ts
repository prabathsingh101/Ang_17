import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HolidayEvents, Holidays } from '../holiday.model';
import { HolidaysService } from '../holidays.service';
import { title } from 'process';

@Component({
    selector: 'app-holidays-calendar',
    imports: [SharedModule, FullCalendarModule],
    templateUrl: './holidays-calendar.component.html',
    styleUrl: './holidays-calendar.component.scss'
})
export default class HolidaysCalendarComponent implements OnInit {
  constructor(private svc: HolidaysService) {}

  holidayEvents: HolidayEvents[] = [];

  //calendarOptions!: CalendarOptions;

  // events: any = [
  //   {
  //     title: 'Republic Day',
  //     date: '2024-07-12',
  //     color: '#0000ff',
  //   },
  //   {
  //     title: 'holi',
  //     date: '2024-07-10',
  //     color: '#0000FF',
  //   }
  // ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    //initialView: 'dayGridMonth',
    //weekends: true,
    eventClick: this.handleDateClick.bind(this)
  };
  handleDateClick(arg: any) {
    //console.log(arg);
  }
  ngOnInit(): void {
    this.bindCal();
  }
  bindCal() {
    this.svc.GetHolidayEvents(this.holidayEvents).subscribe((res: any) => {
      this.holidayEvents = res;
      console.log(this.holidayEvents);
      this.calendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        events: this.holidayEvents,
      };
    });
  }
}
