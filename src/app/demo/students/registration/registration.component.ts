import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export default class RegistrationComponent {

}
