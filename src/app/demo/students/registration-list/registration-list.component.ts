import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-registration-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './registration-list.component.html',
  styleUrl: './registration-list.component.scss'
})
export default class RegistrationListComponent {

}
