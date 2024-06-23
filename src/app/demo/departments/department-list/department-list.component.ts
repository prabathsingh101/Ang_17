import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss'
})
export default class DepartmentListComponent {

}
