import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-student-attendance',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-attendance.component.html',
  styleUrl: './student-attendance.component.scss'
})
export default class StudentAttendanceComponent {

}
