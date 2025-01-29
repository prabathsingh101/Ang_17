// Angular Import
import { Component } from '@angular/core';

@Component({
    selector: 'app-nav-search',
    templateUrl: './nav-search.component.html',
    styleUrls: ['./nav-search.component.scss'],
    standalone: false
})
export class NavSearchComponent {
  // public props
  searchOn = false;
}
