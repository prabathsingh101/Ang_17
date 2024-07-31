import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-fees-paid',
  standalone: true,
  imports: [SharedModule],
  providers:[provideNativeDateAdapter()],
  templateUrl: './fees-paid.component.html',
  styleUrl: './fees-paid.component.scss'
})
export default class FeesPaidComponent {

}
