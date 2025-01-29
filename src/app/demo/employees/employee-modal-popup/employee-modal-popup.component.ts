import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
    selector: 'app-employee-modal-popup',
    imports: [SharedModule],
    templateUrl: './employee-modal-popup.component.html',
    styleUrl: './employee-modal-popup.component.scss'
})
export default class EmployeeModalPopupComponent {

}
