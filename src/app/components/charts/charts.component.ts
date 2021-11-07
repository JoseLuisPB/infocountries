import { Component, Input, OnInit } from '@angular/core';
import { ICountry } from '../../interfaces/country';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  @Input() countryData!:ICountry[];

  // Region lists
  worldList: ICountry[] = [];
  americasList: ICountry[] = [];
  europeList: ICountry[] = [];
  africaList: ICountry[] = [];
  asiaList: ICountry[] = [];
  oceaniaList: ICountry[] = [];
  antarcticList: ICountry[] = [];

  // Regions
  chartRegionLabels: Label[] = ['Americas', 'Europe', 'Africa', 'Asia', 'Oceania', 'Antarctica']
  chartRegionPopulation: SingleDataSet = [];
  chartRegionArea: SingleDataSet = [];

  public chartRegionAreaOptions: ChartOptions = {
    responsive: true,
    title: {display: true, text:'Region areas (Km2)'},
  };

  public chartRegionPopulationOptions: ChartOptions = {
    responsive: true,
    title: {display: true, text:'Region population (hab)'},
  };


  public pieChartLabels: Label[] = ['PHP', '.Net', 'Java'];
  public pieChartData: SingleDataSet = [50, 30, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.worldList = this.countryData;
    this.countrySort();
    this.setRegionAreas();
    this.setRegionPopulation();
  }

  countrySort(): void {
    this.worldList.forEach( country => {
      this.countryDistribution(country);
    });
  }

  countryDistribution(country: ICountry): void {
      const region = country.region;

      switch(region){
        case 'Americas':
          this.americasList.push(country);
          break;

        case 'Europe':
          this.europeList.push(country);
          break;

        case 'Africa':
          this.africaList.push(country);
          break;

        case 'Asia':
          this.asiaList.push(country);
          break;

        case 'Oceania':
          this.oceaniaList.push(country);
          break;

        default:
          this.antarcticList.push(country);
          break;
      }
  }

  setRegionAreas(): void {
    // Important: Order the functions according to chartRegionLabels Order
    this.sumRegionAreas(this.americasList);
    this.sumRegionAreas(this.europeList);
    this.sumRegionAreas(this.africaList);
    this.sumRegionAreas(this.asiaList);
    this.sumRegionAreas(this.oceaniaList);
    this.sumRegionAreas(this.antarcticList);

  }

  setRegionPopulation(): void {
    // Important: Order the functions according to chartRegionLabels Order
    this.sumRegionPopulation(this.americasList);
    this.sumRegionPopulation(this.europeList);
    this.sumRegionPopulation(this.africaList);
    this.sumRegionPopulation(this.asiaList);
    this.sumRegionPopulation(this.oceaniaList);
    this.sumRegionPopulation(this.antarcticList);
  }

  sumRegionAreas(areaList: ICountry[]): void{

    const totalArea = areaList.reduce((total: number, country: ICountry) => {
      const area = country.area ? country.area : 0;
      return area + total;
    }, 0);

    this.chartRegionArea.push(totalArea);
  }

  sumRegionPopulation(populationList: ICountry[]): void {
    const totalPopulation = populationList.reduce((total: number, country: ICountry) => {
      const population = country.population ? country.population : 0;
      return population + total;
    },0);

    this.chartRegionPopulation.push(totalPopulation);
  }



}
