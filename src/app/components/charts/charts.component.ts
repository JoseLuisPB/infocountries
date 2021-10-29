import { Component, Input, OnInit } from '@angular/core';

interface IcountryData {

  code: string;
  country: string;
  capital: string;
  flag: string;
  population: number;
  area: number;
  region: string;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  @Input() countryData!:IcountryData[];

  constructor() { }

  ngOnInit(): void {
  }

}
