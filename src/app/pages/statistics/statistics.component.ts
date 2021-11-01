import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestcountriesService } from 'src/app/services/restcountries.service';
import { ICountry } from '../../interfaces/country';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  isLoading = true;
  countryData: ICountry[] = [];
  subscriptions: Subscription[] = [];

  constructor(private restcountries: RestcountriesService,) {
    this.subscriptions.push( this.restcountries.getAllCountries().subscribe( countries => {

      for(let country of countries){

        this.countryData.push( {
          code: country.cca2,
          name: country.name.common,
          capital: country.capital,
          flag: country.flags[1],
          population: country.population,
          area: country.area,
          region: country.region,
          subregion: country.subregion,
        });
      }
      this.isLoading = false;
    }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
