import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export default class CreateCourseComponent {

}
