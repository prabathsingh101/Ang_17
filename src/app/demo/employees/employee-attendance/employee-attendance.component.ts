import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-employee-attendance',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './employee-attendance.component.html',
  styleUrl: './employee-attendance.component.scss'
})
export default class EmployeeAttendanceComponent {

}
