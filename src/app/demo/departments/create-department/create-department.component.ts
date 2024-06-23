import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-create-department',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.scss'
})
export default class CreateDepartmentComponent {

}
