import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-lesson-create',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './lesson-create.component.html',
  styleUrl: './lesson-create.component.scss'
})
export class LessonCreateComponent {

}
