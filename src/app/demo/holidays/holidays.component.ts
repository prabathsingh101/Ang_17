import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-holidays',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './holidays.component.html',
  styleUrl: './holidays.component.scss'
})
export default class HolidaysComponent {

}
