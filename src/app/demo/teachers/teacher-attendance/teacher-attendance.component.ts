import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-teacher-attendance',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './teacher-attendance.component.html',
  styleUrl: './teacher-attendance.component.scss'
})
export default class TeacherAttendanceComponent {

}
