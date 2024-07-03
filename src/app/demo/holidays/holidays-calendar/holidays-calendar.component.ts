import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-holidays-calendar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './holidays-calendar.component.html',
  styleUrl: './holidays-calendar.component.scss'
})
export default class HolidaysCalendarComponent {

}
