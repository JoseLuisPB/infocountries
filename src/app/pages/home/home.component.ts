import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFlag } from 'src/app/interfaces/flag';
import { RestcountriesService } from 'src/app/services/restcountries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  flagList: IFlag[] = [];
  isLoading: boolean = true;


  constructor(private restcountries: RestcountriesService,
              private router: Router
  ){
    this.subscriptions.push(
      this.restcountries.getAllCountries().subscribe( (countries: any) => {

        for( let country of countries){
          this.flagList.push(
            {
              code: country.cca2,
              country_flag: country.flags[1],
              country: country.name.common
            }
          )
        }
        this.isLoading = false;
      })
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  randomCountry(): void{

    const codeList = this.flagList.map( flag => flag.code);
    const numberOfCountries = this.flagList.length;
    const position = Math.round(Math.random() * (numberOfCountries - 0) + 0);
    const countryCode = codeList[position];
    this.router.navigate(['/detail', countryCode]);
  }

}
