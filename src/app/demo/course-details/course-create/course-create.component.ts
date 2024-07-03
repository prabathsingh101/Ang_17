import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './course-create.component.html',
  styleUrl: './course-create.component.scss'
})
export default class CourseCreateComponent {

}
