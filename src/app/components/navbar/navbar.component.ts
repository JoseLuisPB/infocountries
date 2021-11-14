import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APP_CONST } from '../../constants'
import { AuthorComponent } from '../dialog/author/author.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navHeight = 0;

  constructor(public dialog: MatDialog) {
    this.navHeight = APP_CONST.NAVBAR_HEIGHT;
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(AuthorComponent, {panelClass: 'custom-modalbox'});
  }

}
