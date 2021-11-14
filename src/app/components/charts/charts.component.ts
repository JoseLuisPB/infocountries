import { Component, Input, OnInit } from '@angular/core';
import { ICountry } from '../../interfaces/country';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  @Input() countryData!:ICountry[];

  chartRegionLabels: Label[] = [];
  chartEuropeLabels: Label[] = [];
  worldList: ICountry[] = [];

  // Datasets
  chartRegionPopulation: SingleDataSet = [];
  chartRegionArea: SingleDataSet = [];
  chartEuropeArea: SingleDataSet = [];
  chartEuropePopulation: SingleDataSet = []

  public chartRegionAreaOptions: ChartOptions = {
    responsive: true,
    title: {display: true, text:'Region areas (Km2)'},
  };

  public chartRegionPopulationOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text:'Region population (hab)'
    },
  };

  public pieChartType: ChartType = 'pie';
  public barChartType: ChartType = 'bar';
  public pieChartLegend = true;
  public lineChartLegend = false;
  public pieChartPlugins = [];

  constructor(
    private utilsService: UtilsService,
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.worldList = this.countryData;
    this.chartRegionLabels = this.utilsService.createRegionList(this.worldList);
    this.worldDataCalculation();
    this.regionDataCalculation();

  }

  worldDataCalculation(): void {
    this.chartRegionLabels.forEach( label => {
      const regionArray = this.worldList.filter( (country: ICountry) => country.region === label);
      this.sumRegionAreas(regionArray);
      this.sumRegionPopulation(regionArray);
    });
  }

  regionDataCalculation(): void {
    const europeCountries = this.worldList.filter( country => country.region === 'Europe');
      europeCountries.forEach( country => {
      const label = country.name ? country.name : '';
      const area = country.area ? country.area : 0;
      const population = country.population ? country.population : 0;
      this.chartEuropeLabels.push(label);
      this.chartEuropeArea.push(area);
      this.chartEuropePopulation.push(population);
    });
  }

  sumRegionAreas(areaList: any): void{
    const totalArea = areaList.reduce((total: number, country: ICountry) => {
      return (country.area ? country.area : 0) + total;
    }, 0);

    this.chartRegionArea.push(totalArea);
  }

  sumRegionPopulation(populationList: any): void {
    const totalPopulation = populationList.reduce((total: number, country: ICountry) => {
      return (country.population ? country.population : 0) + total;
    },0);

    this.chartRegionPopulation.push(totalPopulation);
  }

}
