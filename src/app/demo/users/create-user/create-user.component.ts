import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export default class CreateUserComponent {

}
