import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICountry } from 'src/app/interfaces/country';
import { RestcountriesService } from 'src/app/services/restcountries.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  languagesFormated = '';
  numOfLanguages = 0;
  isLoading = true;

  country: ICountry = {
    code: '',
    flag: '',
    name: '',
    capital:'',
    languages: [],
    population: 0,
    area: 0,
    region: '',
    subregion: '',
  };

  constructor(private restcountries: RestcountriesService,
              private route: ActivatedRoute
  )
  {
    const id = this.route.snapshot.params.id;
    this.subscriptions.push(
      this.restcountries.getCountry(id).subscribe( data => {

        this.country.code = data[0].cca2;
        this.country.flag = data[0].flags[1];
        this.country.name = data[0].name.common;
        this.country.capital = data[0].capital[0];
        this.country.population = data[0].population;
        this.country.area = data[0].area;
        this.country.region = data[0].region;
        this.country.subregion = data[0].subregion;

        // Convert the object of languages to an array to iterate
        const entries = Object.entries(data[0].languages)
        entries.forEach( item => {
          this.country.languages?.push(String(item[1]));
        });

        if ( this.country.languages !== undefined ) {
          this.languagesFormated = this.country.languages?.join(', ');
          this.numOfLanguages = this.country.languages.length;
        }

        this.isLoading = false;
      })
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

}
