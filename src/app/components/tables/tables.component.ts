import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestcountriesService } from 'src/app/services/restcountries.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

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
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['flag', 'country', 'capital', 'population', 'area'];
  countryData: IcountryData[] = [];
  dataSource!: MatTableDataSource<IcountryData>;
  subscriptions: Subscription[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private restcountries: RestcountriesService,
    private liveAnnouncer: LiveAnnouncer,
    ) {

    this.subscriptions.push( this.restcountries.getAllCountries().subscribe((countries: any) => {

      for(let country of countries){

        this.countryData.push( {
          code: country.cca2,
          country: country.name.common,
          capital: country.capital,
          flag: country.flags[1],
          population: country.population,
          area: country.area,
          region: country.region,
        });
      }
      this.dataSource = new MatTableDataSource<IcountryData>(this.countryData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }));


  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

}
