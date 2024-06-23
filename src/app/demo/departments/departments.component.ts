import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export default class DepartmentsComponent {

}
