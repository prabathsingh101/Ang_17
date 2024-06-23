import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-user-profiles',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-profiles.component.html',
  styleUrl: './user-profiles.component.scss'
})
export default class UserProfilesComponent {

}
