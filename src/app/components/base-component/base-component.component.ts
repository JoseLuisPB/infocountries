import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss']
})
export class BaseComponentComponent implements OnInit {
  windowHeight = 0;

  constructor(private utils: UtilsService,) {
    this.windowHeight = this.utils.getWindowHeight() - 80;
  }

  ngOnInit(): void {
  }

}
