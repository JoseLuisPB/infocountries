import { Component, OnInit } from '@angular/core';
import { APP_CONST } from '../../constants'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navHeight = 0;

  constructor() {
    this.navHeight = APP_CONST.NAVBAR_HEIGHT;
  }

  ngOnInit(): void {
  }

}
