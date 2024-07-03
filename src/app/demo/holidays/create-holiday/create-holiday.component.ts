import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-create-holiday',
  standalone: true,
  imports: [SharedModule],
  providers:[provideNativeDateAdapter()],
  templateUrl: './create-holiday.component.html',
  styleUrl: './create-holiday.component.scss'
})
export default class CreateHolidayComponent {

}
