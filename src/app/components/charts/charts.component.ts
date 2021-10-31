import { Component, Input, OnInit } from '@angular/core';
import { ICountry } from '../../interfaces/country';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  @Input() countryData!:ICountry[];

  constructor() { }

  ngOnInit(): void {
  }

}
