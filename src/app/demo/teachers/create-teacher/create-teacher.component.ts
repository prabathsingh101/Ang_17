import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-create-teacher',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './create-teacher.component.html',
  styleUrl: './create-teacher.component.scss'
})
export default class CreateTeacherComponent {

}
