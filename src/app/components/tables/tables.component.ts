import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestcountriesService } from 'src/app/services/restcountries.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

interface IcountryData {

  code: string;
  country: string;
  capital: string;
  flag: string;
  population: number;
  area: number;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, OnDestroy {

  isLoading = true;
  displayedColumns: string[] = ['flag', 'country', 'capital', 'population', 'area'];
  countryData: IcountryData[] = [];
  dataSource!: MatTableDataSource<IcountryData>;
  subscriptions: Subscription[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private restcountries: RestcountriesService) {

    this.subscriptions.push( this.restcountries.getAllCountries().subscribe((countries: any) => {

      for(let country of countries){

        this.countryData.push( {
          code: country.cca2,
          country: country.name.common,
          capital: country.capital,
          flag: country.flags[1],
          population: country.population,
          area: country.area,
        });
      }
      this.dataSource = new MatTableDataSource<IcountryData>(this.countryData);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    }));


  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if ( !this.isLoading) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

}
