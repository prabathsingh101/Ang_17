// Angular Import
import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

// bootstrap
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/demo/authentication/services/login.service';

@Component({
    selector: 'app-nav-right',
    templateUrl: './nav-right.component.html',
    styleUrls: ['./nav-right.component.scss'],
    providers: [NgbDropdownConfig, LoginService],
    animations: [
        trigger('slideInOutLeft', [
            transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
            transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
        ]),
        trigger('slideInOutRight', [
            transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
            transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
        ])
    ],
    standalone: false
})
export class NavRightComponent implements OnInit {
  // public props
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId!: number;

  loginName: any;

  // constructor
  constructor(private loginSvc: LoginService) {
    this.visibleUserList = false;
    this.chatMessage = false;
  }

  // public method
  onChatToggle(friendID: number) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }
  ngOnInit(): void {
    this.geName();
  }
  logout() {
    this.loginSvc.Logout();
  }
  geName() {
    this.loginSvc.getName().subscribe({
      next: (res) => {
        this.loginName = res;
      }
    });
  }
}
