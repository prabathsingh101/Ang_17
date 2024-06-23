import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-admission-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admission-list.component.html',
  styleUrl: './admission-list.component.scss'
})
export default class AdmissionListComponent {

}
