import { Component, OnInit, Input } from '@angular/core';
import { IFlag } from '../../interfaces/flag'

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent implements OnInit {

  @Input() flag_data!: IFlag;

  constructor() {


  }

  ngOnInit(): void {
  }

}
