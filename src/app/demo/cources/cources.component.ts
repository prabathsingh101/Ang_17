import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-cources',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cources.component.html',
  styleUrl: './cources.component.scss'
})
export default class CourcesComponent {

}
