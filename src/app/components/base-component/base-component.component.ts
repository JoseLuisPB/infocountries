import { Component, OnInit } from '@angular/core';
import { APP_CONST } from 'src/app/constants';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss']
})
export class BaseComponentComponent implements OnInit {
  windowHeight = 0;

  constructor(private utils: UtilsService,) {
    this.windowHeight = window.innerHeight - APP_CONST.NAVBAR_HEIGHT - APP_CONST.FOOTER_HEIGHT;
  }

  ngOnInit(): void {
  }

}
