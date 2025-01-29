import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
    selector: 'app-change-password',
    imports: [SharedModule],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
})
export default class ChangePasswordComponent {

}
