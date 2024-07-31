import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-fees-paid-history',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './fees-paid-history.component.html',
  styleUrl: './fees-paid-history.component.scss'
})
export default class FeesPaidHistoryComponent {

}
