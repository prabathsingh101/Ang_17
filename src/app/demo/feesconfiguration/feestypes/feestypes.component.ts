import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-feestypes',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './feestypes.component.html',
  styleUrl: './feestypes.component.scss'
})
export default class FeestypesComponent {

}
