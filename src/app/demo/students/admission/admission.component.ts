import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.scss'
})
export default class AdmissionComponent {

}
