import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export default class StudentsComponent {

}
