import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
    selector: 'app-employees',
    imports: [SharedModule],
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.scss'
})
export default class EmployeesComponent {

}
