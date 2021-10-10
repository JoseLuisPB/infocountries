import { Component, OnInit } from '@angular/core';
import { APP_CONST } from 'src/app/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerHeight = 0;
  constructor() {
    this.footerHeight = APP_CONST.FOOTER_HEIGHT;
  }

  ngOnInit(): void {
  }

}
